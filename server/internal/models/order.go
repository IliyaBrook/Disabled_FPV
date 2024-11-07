package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Order struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	UserID      primitive.ObjectID `bson:"user_id" json:"user_id"`
	TotalAmount float64            `bson:"total_amount" json:"total_amount"`
	OrderDate   primitive.DateTime `bson:"order_date" json:"order_date"`
	Status      string             `bson:"status" json:"status"`
	Products    []OrderProduct     `bson:"products" json:"products"`
}

type OrderProduct struct {
	ProductID primitive.ObjectID `bson:"product_id" json:"product_id"`
	Quantity  int                `bson:"quantity" json:"quantity"`
	Price     float64            `bson:"price" json:"price"`
}
