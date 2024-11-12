package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Cart struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	UserID    primitive.ObjectID `bson:"user_id" json:"user_id"`
	Products  []CartProduct      `bson:"products" json:"products"`
	UpdatedAt primitive.DateTime `bson:"updated_at" json:"updated_at"`
}

type CartProduct struct {
	ProductID primitive.ObjectID `bson:"product_id" json:"product_id"`
	Quantity  int                `bson:"quantity" json:"quantity"`
	Price     float64            `bson:"price" json:"price"`
}
