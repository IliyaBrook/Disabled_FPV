package services

import (
	"context"
	"disabled-fpv-server/internal/config"
	"disabled-fpv-server/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"time"
)

type OrderService struct {
	repo *mongo.Collection
}

func NewOrderService(client *mongo.Client) *OrderService {
	return &OrderService{
		repo: client.Database(config.Env.DbName).Collection("orders"),
	}
}

func (s *OrderService) CreateOrder(ctx context.Context, order *models.Order) (*models.Order, error) {
	order.ID = primitive.NewObjectID()
	order.OrderDate = primitive.NewDateTimeFromTime(time.Now())

	result, err := s.repo.InsertOne(ctx, order)
	if oid, ok := result.InsertedID.(primitive.ObjectID); ok {
		order.ID = oid
	}
	return order, err
}

func (s *OrderService) GetUserOrders(ctx context.Context, userID primitive.ObjectID) ([]models.Order, error) {
	filter := bson.M{"user_id": userID}
	cursor, err := s.repo.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	var orders []models.Order
	if err := cursor.All(ctx, &orders); err != nil {
		return nil, err
	}
	return orders, nil
}

func (s *OrderService) GetUserOrdersById(ctx context.Context, userID primitive.ObjectID, orderID primitive.ObjectID) ([]models.Order, error) {
	filter := bson.M{"user_id": userID, "_id": orderID}
	var order models.Order
	if err := s.repo.FindOne(ctx, filter).Decode(&order); err != nil {
		return nil, err
	}
	return []models.Order{order}, nil
}
