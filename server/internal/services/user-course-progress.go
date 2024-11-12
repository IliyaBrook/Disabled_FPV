package services

import (
	"context"
	"disabled-fpv-server/internal/config"
	"disabled-fpv-server/internal/models"
	"disabled-fpv-server/internal/utils"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

type UserCourseProgressService struct {
	repo *mongo.Collection
}

func NewUserCourseProgressService(client *mongo.Client) *UserCourseProgressService {
	return &UserCourseProgressService{
		repo: client.Database(config.Env.DbName).Collection("user_course_progress"),
	}
}

func (s *UserCourseProgressService) UpdateCourseProgress(ctx context.Context, progress *models.UserCourseProgress) (*models.UserCourseProgress, error) {
	filter := bson.M{"user_id": progress.UserID, "course_id": progress.CourseID}

	updateData := utils.GenerateUpdateData(progress)
	if len(updateData) == 0 {
		return nil, errors.New("no fields to update")
	}

	updateOptions := options.FindOneAndUpdate().SetReturnDocument(options.After)
	var updatedProgress models.UserCourseProgress
	result := s.repo.FindOneAndUpdate(ctx, filter, bson.M{"$set": updateData}, updateOptions)
	if err := result.Decode(&updatedProgress); err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, mongo.ErrNoDocuments
		}
		return nil, err
	}

	return &updatedProgress, nil
}

func (s *UserCourseProgressService) GetCourseProgress(ctx context.Context, userID, courseID primitive.ObjectID) ([]*models.UserCourseProgress, error) {

	filter := bson.M{"user_id": userID}
	if courseID != primitive.NilObjectID {
		filter["course_id"] = courseID
	}

	var progress []*models.UserCourseProgress
	cursor, err := s.repo.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var item models.UserCourseProgress
		if err := cursor.Decode(&item); err != nil {
			return nil, err
		}
		progress = append(progress, &item)
	}
	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return progress, nil
}

func (s *UserCourseProgressService) CreateUserCourseProgress(ctx context.Context, userCourseProgress *models.UserCourseProgress) (*models.UserCourseProgress, error) {
	userCourseProgress.ID = primitive.NewObjectID()
	userCourseProgress.LastAccessed = primitive.NewDateTimeFromTime(time.Now())
	_, err := s.repo.InsertOne(ctx, userCourseProgress)
	return userCourseProgress, err
}
