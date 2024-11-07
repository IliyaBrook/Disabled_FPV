package services

import (
	"context"
	"disabled-fpv-server/internal/models"
	"disabled-fpv-server/internal/utils"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type UserCourseProgressService struct {
	repo *mongo.Collection
}

func NewUserCourseProgressService(client *mongo.Client) *UserCourseProgressService {
	return &UserCourseProgressService{
		repo: client.Database("db_name").Collection("user_course_progress"),
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

func (s *UserCourseProgressService) GetCourseProgress(ctx context.Context, userID, courseID primitive.ObjectID) (*models.UserCourseProgress, error) {
	filter := bson.M{"user_id": userID, "course_id": courseID}
	var progress models.UserCourseProgress
	err := s.repo.FindOne(ctx, filter).Decode(&progress)
	if errors.Is(err, mongo.ErrNoDocuments) {
		return nil, nil
	}
	return &progress, err
}
