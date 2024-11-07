package services

import (
	"context"
	"disabled-fpv-server/internal/config"
	"disabled-fpv-server/internal/models"
	"disabled-fpv-server/internal/utils"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

type ProductService struct {
	repo *mongo.Collection
}

func NewProductService(client *mongo.Client) *ProductService {
	return &ProductService{
		repo: client.Database(config.Env.DbName).Collection("products"),
	}
}

func (s *ProductService) CreateProduct(ctx context.Context, product *models.Product) (*models.Product, error) {
	product.ID = primitive.NewObjectID()
	product.CreatedAt = primitive.NewDateTimeFromTime(time.Now())
	product.UpdatedAt = product.CreatedAt
	_, err := s.repo.InsertOne(ctx, product)
	return product, err
}

func (s *ProductService) UpdateProduct(ctx context.Context, productID primitive.ObjectID, updatedProduct *models.Product) (*models.Product, error) {
	filter := bson.M{"_id": productID}
	updatedProduct.UpdatedAt = primitive.NewDateTimeFromTime(time.Now())
	existedField := utils.GenerateUpdateData(updatedProduct)
	updateData := bson.M{"$set": existedField}
	updatedOptions := options.FindOneAndUpdate().SetReturnDocument(options.After)
	result := s.repo.FindOneAndUpdate(ctx, filter, bson.M{"$set": updateData}, updatedOptions)
	if err := result.Decode(&result); err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, mongo.ErrNoDocuments
		}
		return nil, err
	}
	return updatedProduct, nil
}

func (s *ProductService) DeleteProduct(ctx context.Context, productID primitive.ObjectID) error {
	_, err := s.repo.DeleteOne(ctx, bson.M{"_id": productID})
	return err
}

func (s *ProductService) GetAllProducts(ctx context.Context, name, category string, page, limit int) ([]models.Product, error) {
	filter := bson.M{}
	if name != "" {
		filter["name"] = bson.M{"$regex": name, "$options": "i"}
	}
	if category != "" {
		filter["category"] = category
	}

	skip := (page - 1) * limit
	findOptions := options.Find().SetSkip(int64(skip)).SetLimit(int64(limit))

	cursor, err := s.repo.Find(ctx, filter, findOptions)
	if err != nil {
		return nil, err
	}
	var products []models.Product
	if err := cursor.All(ctx, &products); err != nil {
		return nil, err
	}
	return products, nil
}
