package services

import (
	"context"
	"disabled-fpv-server/internal/config"
	"disabled-fpv-server/internal/dto"
	"disabled-fpv-server/internal/models"
	"disabled-fpv-server/internal/utils"
	"errors"
	"fmt"
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

func (s *CourseService) GetAllCourses(ctx context.Context, params dto.GetAllCoursesParams) ([]models.Course, error) {
	filter := bson.M{}
	if params.Name != "" {
		filter["name"] = bson.M{"$regex": params.Name, "$options": "i"}
	}
	var limit = int64(params.Limit)
	skip := int64(params.Page-1) * limit

	pipeline := mongo.Pipeline{
		{{"$match", filter}},
	}
	fmt.Println("limit log:", limit)
	if params.Populate {
		pipeline = append(pipeline, bson.D{{"$lookup", bson.M{
			"from":         "course_pages",
			"localField":   "_id",
			"foreignField": "course_id",
			"as":           "pages",
		}}})
	}

	pipeline = append(pipeline, bson.D{{"$sort", bson.M{"created_at": -1}}})
	pipeline = append(pipeline, bson.D{{"$skip", skip}})
	pipeline = append(pipeline, bson.D{{"$limit", limit}})

	cursor, err := s.repo.Aggregate(ctx, pipeline)
	if err != nil {
		return nil, err
	}

	var courses []models.Course
	if err := cursor.All(ctx, &courses); err != nil {
		return nil, err
	}

	return courses, nil
}

func (s *CourseService) GetCourseById(ctx context.Context, courseID primitive.ObjectID, pageNumber int) (*models.Course, error) {

	matchExpr := bson.M{
		"$eq": []interface{}{"$course_id", "$$course_id"},
	}

	if pageNumber > 0 {
		matchExpr = bson.M{
			"$and": []interface{}{
				bson.M{"$eq": []interface{}{"$course_id", "$$course_id"}},
				bson.M{"$eq": []interface{}{"$page_number", pageNumber}},
			},
		}
	}

	pipeline := mongo.Pipeline{
		{{"$match", bson.M{"_id": courseID}}},
		{{"$lookup", bson.M{
			"from": "course_pages",
			"let":  bson.M{"course_id": "$_id"},
			"pipeline": mongo.Pipeline{
				{{"$match", bson.M{
					"$expr": matchExpr,
				}}},
				{{"$sort", bson.M{"page_number": 1}}},
			},
			"as": "pages",
		}}},
	}

	var result models.Course
	cursor, err := s.repo.Aggregate(ctx, pipeline)
	if err != nil {
		return nil, err
	}
	if !cursor.Next(ctx) {
		if errors.Is(cursor.Err(), mongo.ErrNoDocuments) {
			return nil, nil
		}
		return nil, cursor.Err()
	}
	err = cursor.Decode(&result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}
