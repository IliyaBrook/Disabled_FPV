package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID                 primitive.ObjectID   `bson:"_id,omitempty" json:"id,omitempty"`
	Role               string               `bson:"role" json:"role"` // "user" | "admin"
	FirstName          string               `bson:"first_name" json:"first_name"`
	LastName           string               `bson:"last_name,omitempty" json:"last_name,omitempty"`
	Email              string               `bson:"email" json:"email"`
	Password           string               `bson:"password" json:"password"`
	UserCourseProgress []primitive.ObjectID `bson:"user_course_progress" json:"user_course_progress"`
	Orders             []primitive.ObjectID `bson:"orders" json:"orders"`
	CreatedAt          primitive.DateTime   `bson:"created_at" json:"created_at"`
}

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
