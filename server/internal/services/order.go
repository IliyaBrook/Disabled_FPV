package services

import (
	"context"
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
		repo: client.Database("db_name").Collection("orders"),
	}
}

func (s *OrderService) CreateOrder(ctx context.Context, order *models.Order) (*models.Order, error) {
	order.ID = primitive.NewObjectID()
	order.OrderDate = primitive.NewDateTimeFromTime(time.Now())
	_, err := s.repo.InsertOne(ctx, order)
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
