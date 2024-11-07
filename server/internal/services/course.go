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

type CourseService struct {
	repo *mongo.Collection
}

func NewCourseService(client *mongo.Client) *CourseService {
	return &CourseService{
		repo: client.Database(config.Env.DbName).Collection("courses"),
	}
}

func (s *CourseService) CreateCourse(ctx context.Context, course *models.Course) (*models.Course, error) {
	course.ID = primitive.NewObjectID()
	course.CreatedAt = primitive.NewDateTimeFromTime(time.Now())
	course.UpdatedAt = course.CreatedAt

	_, err := s.repo.InsertOne(ctx, course)
	return course, err
}

func (s *CourseService) UpdateCourse(ctx context.Context, courseID primitive.ObjectID, updatedCourse *models.Course) (*models.Course, error) {
	filter := bson.M{"_id": courseID}
	updatedCourse.UpdatedAt = primitive.NewDateTimeFromTime(time.Now())

	updateData := utils.GenerateUpdateData(updatedCourse)
	updateOptions := options.FindOneAndUpdate().SetReturnDocument(options.After)

	var result models.Course
	err := s.repo.FindOneAndUpdate(ctx, filter, bson.M{"$set": updateData}, updateOptions).Decode(&result)
	if errors.Is(err, mongo.ErrNoDocuments) {
		return nil, errors.New("course not found")
	}
	return &result, err
}

func (s *CourseService) DeleteCourse(ctx context.Context, courseID primitive.ObjectID) error {
	_, err := s.repo.DeleteOne(ctx, bson.M{"_id": courseID})
	return err
}

func (s *CourseService) GetAllCourses(ctx context.Context, name string, page, limit int) ([]models.Course, error) {
	filter := bson.M{}
	if name != "" {
		filter["name"] = bson.M{"$regex": name, "$options": "i"}
	}

	skip := (page - 1) * limit
	findOptions := options.Find().SetSkip(int64(skip)).SetLimit(int64(limit))

	cursor, err := s.repo.Find(ctx, filter, findOptions)
	if err != nil {
		return nil, err
	}
	var courses []models.Course
	if err := cursor.All(ctx, &courses); err != nil {
		return nil, err
	}
	return courses, nil
}

func (s *CourseService) GetCourseById(ctx context.Context, courseID primitive.ObjectID) (*models.Course, error) {
	filter := bson.M{"_id": courseID}
	var course models.Course
	if err := s.repo.FindOne(ctx, filter).Decode(&course); err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, nil
		}
		return nil, err
	}
	return &course, nil
}
