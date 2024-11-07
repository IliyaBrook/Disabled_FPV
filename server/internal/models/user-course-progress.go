package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type UserCourseProgress struct {
	ID                primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	UserID            primitive.ObjectID `bson:"user_id" json:"user_id"`
	CourseID          primitive.ObjectID `bson:"course_id" json:"course_id"`
	CurrentVideoIndex int                `bson:"current_video_index" json:"current_video_index"`
	CurrentPageID     primitive.ObjectID `bson:"current_page_id" json:"current_page_id"`
	StartedOn         primitive.DateTime `bson:"started_on" json:"started_on"`
	LastAccessed      primitive.DateTime `bson:"last_accessed" json:"last_accessed"`
	VideosProgress    []VideoProgress    `bson:"videos_progress" json:"videos_progress"`
}

type VideoProgress struct {
	PageID               primitive.ObjectID `bson:"page_id" json:"page_id"`
	VideoID              string             `bson:"video_id" json:"video_id"`
	LastWatchedTimestamp string             `bson:"last_watched_timestamp" json:"last_watched_timestamp"`
	Completed            bool               `bson:"completed" json:"completed"`
}
