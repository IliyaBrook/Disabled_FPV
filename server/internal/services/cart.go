package services

import (
	"context"
	"disabled-fpv-server/internal/config"
	"disabled-fpv-server/internal/models"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

type CartService struct {
	repo *mongo.Collection
}

func NewCartService(client *mongo.Client) *CartService {
	return &CartService{
		repo: client.Database(config.Env.DbName).Collection("orders"),
	}
}

func (s *CartService) AddToCart(ctx context.Context, userID primitive.ObjectID, cartProduct models.CartProduct) error {
	filter := bson.M{"user_id": userID}
	update := bson.M{"$push": bson.M{"products": cartProduct}, "$set": bson.M{"updated_at": primitive.NewDateTimeFromTime(time.Now())}}
	_, err := s.repo.UpdateOne(ctx, filter, update, options.Update().SetUpsert(true))
	return err
}

func (s *CartService) GetUserCart(ctx context.Context, userID primitive.ObjectID) (*models.Cart, error) {
	filter := bson.M{"user_id": userID}
	var cart models.Cart
	if err := s.repo.FindOne(ctx, filter).Decode(&cart); err != nil {
		return nil, err
	}

	return &cart, nil
}

func (s *CartService) RemoveFromCart(ctx context.Context, userID, productID primitive.ObjectID) error {
	filter := bson.M{"user_id": userID}
	update := bson.M{"$pull": bson.M{"products": bson.M{"product_id": productID}}}
	_, err := s.repo.UpdateOne(ctx, filter, update)
	return err
}

func calculateTotal(products []models.CartProduct) float64 {
	var total float64
	for _, product := range products {
		total += product.Price * float64(product.Quantity)
	}
	return total
}

func (s *CartService) Checkout(ctx context.Context, userID primitive.ObjectID) (*models.Order, error) {
	cart, err := s.GetUserCart(ctx, userID)
	if err != nil || len(cart.Products) == 0 {
		return nil, fmt.Errorf("cart is empty or error occurred: %v", err)
	}

	order := &models.Order{
		ID:          primitive.NewObjectID(),
		UserID:      userID,
		TotalAmount: calculateTotal(cart.Products),
		OrderDate:   primitive.NewDateTimeFromTime(time.Now()),
		Status:      "completed",
		Products:    convertToOrderProducts(cart.Products),
	}

	ordersCollection := s.repo.Database().Collection("orders")
	_, err = ordersCollection.InsertOne(ctx, order)
	if err != nil {
		return nil, err
	}

	_, err = s.repo.DeleteOne(ctx, bson.M{"user_id": userID})
	if err != nil {
		return nil, err
	}

	return order, nil
}

func convertToOrderProducts(cartProducts []models.CartProduct) []models.OrderProduct {
	var orderProducts []models.OrderProduct
	for _, cp := range cartProducts {
		orderProducts = append(orderProducts, models.OrderProduct{
			ProductID: cp.ProductID,
			Quantity:  cp.Quantity,
			Price:     cp.Price,
		})
	}
	return orderProducts
}
