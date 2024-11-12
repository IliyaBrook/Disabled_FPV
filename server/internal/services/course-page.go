package services

import (
	"context"
	"disabled-fpv-server/internal/config"
	"disabled-fpv-server/internal/models"
	"disabled-fpv-server/internal/utils"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

type CoursePageService struct {
	repo *mongo.Collection
}

func NewCoursePageService(client *mongo.Client) *CoursePageService {
	return &CoursePageService{
		repo: client.Database(config.Env.DbName).Collection("course_pages"),
	}
}

// Add services

func (s *CoursePageService) AddCoursePage(ctx context.Context, page *models.CoursePage) (*models.CoursePage, error) {
	page.ID = primitive.NewObjectID()
	page.CreatedAt = primitive.NewDateTimeFromTime(time.Now())

	result, err := s.repo.InsertOne(ctx, page)
	if oid, ok := result.InsertedID.(primitive.ObjectID); ok {
		page.ID = oid
	}
	return page, err
}

// Get services

func (s *CoursePageService) GetCoursePage(ctx context.Context, courseId primitive.ObjectID, pageNumberID primitive.ObjectID) (*models.CoursePage, error) {
	var page models.CoursePage
	err := s.repo.FindOne(ctx, bson.M{"course_id": courseId, "page_number": pageNumberID}).Decode(&page)
	if err != nil {
		return nil, err
	}
	return &page, nil
}

// update services

func (s *CoursePageService) UpdateAllFieldsExceptVideos(ctx context.Context, courseID primitive.ObjectID, pageNumber int, updatedPage *models.CoursePage) (*models.CoursePage, error) {
	filter := bson.M{"course_id": courseID, "page_number": pageNumber}

	existingFields := utils.GenerateUpdateData(*updatedPage)
	delete(existingFields, "videos")

	updateOptions := options.FindOneAndUpdate().SetReturnDocument(options.After)
	result := s.repo.FindOneAndUpdate(ctx, filter, bson.M{"$set": existingFields}, updateOptions)

	var currentCoursePage models.CoursePage
	if err := result.Decode(&currentCoursePage); err != nil {
		return nil, err
	}
	return &currentCoursePage, nil
}

func (s *CoursePageService) UpdateAllVideosInCoursePage(ctx context.Context, courseID primitive.ObjectID, pageNumber int, updatedPage *models.CoursePage) (*models.CoursePage, error) {
	filter := bson.M{"course_id": courseID, "page_number": pageNumber}

	videosUpdate := utils.GenerateUpdateData(struct {
		Videos []models.Video `bson:"videos"`
	}{Videos: updatedPage.Videos})

	updateOptions := options.FindOneAndUpdate().SetReturnDocument(options.After)
	result := s.repo.FindOneAndUpdate(ctx, filter, bson.M{"$set": videosUpdate}, updateOptions)

	var currentCoursePage models.CoursePage
	if err := result.Decode(&currentCoursePage); err != nil {
		return nil, err
	}
	return &currentCoursePage, nil
}

func (s *CoursePageService) UpdateSingleVideoInCoursePage(ctx context.Context, courseID primitive.ObjectID, pageNumber int, videoID string, updatedPage *models.CoursePage) (*models.CoursePage, error) {
	filter := bson.M{"course_id": courseID, "page_number": pageNumber}

	var currentCoursePage models.CoursePage
	if err := s.repo.FindOne(ctx, filter).Decode(&currentCoursePage); err != nil {
		return nil, err
	}

	videoFound := false
	for i, video := range currentCoursePage.Videos {
		if video.VideoID == videoID {
			videoFound = true
			if len(updatedPage.Videos) > 0 {
				updatedVideo := updatedPage.Videos[0]

				if updatedVideo.Title != "" {
					currentCoursePage.Videos[i].Title = updatedVideo.Title
				}
				if updatedVideo.Description != "" {
					currentCoursePage.Videos[i].Description = updatedVideo.Description
				}
				if updatedVideo.PublishedAt.Time().IsZero() == false {
					currentCoursePage.Videos[i].PublishedAt = updatedVideo.PublishedAt
				}
				if updatedVideo.Duration != 0 {
					currentCoursePage.Videos[i].Duration = updatedVideo.Duration
				}
				if updatedVideo.ThumbnailUrl != "" {
					currentCoursePage.Videos[i].ThumbnailUrl = updatedVideo.ThumbnailUrl
				}
			}
			break
		}
	}

	if !videoFound {
		return nil, fmt.Errorf("video with ID %s not found", videoID)
	}

	update := bson.M{"$set": bson.M{"videos": currentCoursePage.Videos}}
	updateOptions := options.FindOneAndUpdate().SetReturnDocument(options.After)
	result := s.repo.FindOneAndUpdate(ctx, filter, update, updateOptions)
	if err := result.Decode(&currentCoursePage); err != nil {
		return nil, err
	}

	return &currentCoursePage, nil
}

// Delete services

func (s *CoursePageService) DeleteCoursePage(ctx context.Context, courseID primitive.ObjectID, pageNumber int) error {
	_, err := s.repo.DeleteOne(ctx, bson.M{"course_id": courseID, "page_number": pageNumber})
	return err
}

func (s *CoursePageService) GetPagesByCourseAndNumber(ctx context.Context, courseID primitive.ObjectID, pageNumber int) ([]models.CoursePage, error) {
	filter := bson.M{"course_id": courseID}
	if pageNumber > 0 {
		filter["page_number"] = pageNumber
	}

	cursor, err := s.repo.Find(ctx, filter)
	if err != nil {
		return nil, err
	}

	var pages []models.CoursePage
	if err := cursor.All(ctx, &pages); err != nil {
		return nil, err
	}
	return pages, nil
}

func (s *CoursePageService) GetCoursePagesCount(ctx context.Context, courseID primitive.ObjectID) (int64, error) {
	count, err := s.repo.CountDocuments(ctx, bson.M{"course_id": courseID})
	return count, err
}
