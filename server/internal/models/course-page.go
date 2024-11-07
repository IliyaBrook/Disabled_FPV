package models

import (
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CoursePage struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	CourseID   primitive.ObjectID `bson:"course_id" json:"course_id"`
	PageNumber int                `bson:"page_number" json:"page_number"`
	Content    bson.Raw           `bson:"content" json:"content"`
	Videos     []Video            `bson:"videos" json:"videos"`
	CreatedAt  primitive.DateTime `bson:"created_at" json:"created_at"`
}
