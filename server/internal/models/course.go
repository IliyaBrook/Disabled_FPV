package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Course struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name        string             `bson:"name" json:"name"`
	Description string             `bson:"description" json:"description"`
	CreatedAt   primitive.DateTime `bson:"created_at" json:"created_at"`
	UpdatedAt   primitive.DateTime `bson:"updated_at" json:"updated_at"`
	Videos      []Video            `bson:"videos" json:"videos"`
}

type Video struct {
	VideoID      string             `bson:"video_id" json:"video_id"`
	Title        string             `bson:"title" json:"title"`
	Description  string             `bson:"description" json:"description"`
	PublishedAt  primitive.DateTime `bson:"published_at" json:"published_at"`
	Duration     string             `bson:"duration" json:"duration"`
	ThumbnailUrl string             `bson:"thumbnail_url" json:"thumbnail_url"`
}
