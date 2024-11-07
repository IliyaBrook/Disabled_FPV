package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Product struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name        string             `bson:"name" json:"name"`
	CreatedAt   primitive.DateTime `bson:"created_at" json:"created_at"`
	UpdatedAt   primitive.DateTime `bson:"updated_at" json:"updated_at"`
	Price       float64            `bson:"price" json:"price"`
	Image       string             `bson:"image" json:"image"`
	Description string             `bson:"description" json:"description"`
}
