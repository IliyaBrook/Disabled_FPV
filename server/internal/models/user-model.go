package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	FirstName string             `bson:"first_name" json:"first_name"`
	LastName  string             `json:"last_name,omitempty" bson:"last_name,omitempty"`
	Email     string             `bson:"email" json:"email"`
	Password  string             `bson:"password" json:"password"`
}

func NewUser(id primitive.ObjectID, firstName, lastName, email, password string) *User {
	return &User{
		ID:        id,
		FirstName: firstName,
		LastName:  lastName,
		Email:     email,
		Password:  password,
	}
}

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
