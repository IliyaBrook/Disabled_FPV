package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Role      string             `bson:"role" json:"role"` // "user" | "admin",
	Lang      string             `bson:"lang" json:"lang"` // "en-US" | "he-IL",
	FirstName string             `bson:"first_name" json:"first_name"`
	LastName  string             `bson:"last_name,omitempty" json:"last_name omitempty"`
	Email     string             `bson:"email" json:"email"`
	Password  string             `bson:"password" json:"password"`
	CreatedAt primitive.DateTime `bson:"created_at" json:"created_at"`
}

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
