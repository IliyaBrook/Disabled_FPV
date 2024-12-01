package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CoursePage struct {
	ID         primitive.ObjectID `bson:"_id, omitempty" json:"id,omitempty"`
	CourseID   primitive.ObjectID `bson:"course_id" json:"course_id"`
	PageNumber int                `bson:"page_number" json:"page_number"`
	Content    string             `bson:"content" json:"content"`
	Videos     []Video            `bson:"videos" json:"videos"`
	CreatedAt  primitive.DateTime `bson:"created_at" json:"created_at"`
}

type Video struct {
	VideoID      string             `bson:"video_id" json:"video_id"`
	Title        string             `bson:"title" json:"title"`
	Description  string             `bson:"description" json:"description"`
	PublishedAt  primitive.DateTime `bson:"published_at" json:"published_at"`
	Duration     int                `bson:"duration" json:"duration"`
	ThumbnailUrl string             `bson:"thumbnail_url" json:"thumbnail_url"`
}
