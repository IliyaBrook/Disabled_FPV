package handlers

import (
	"disabled-fpv-server/internal/models"
	"disabled-fpv-server/internal/services"
	"disabled-fpv-server/internal/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
)

type UserCourseProgressHandler struct {
	mongoClient *mongo.Client
}

func NewUserCourseProgressHandler(mongoClient *mongo.Client) *UserCourseProgressHandler {
	return &UserCourseProgressHandler{mongoClient: mongoClient}
}

func (h *UserCourseProgressHandler) UpdateCourseProgress(c *gin.Context) {
	var progress models.UserCourseProgress
	if err := c.ShouldBindJSON(&progress); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid progress data"})
		return
	}
	userData := utils.GetUserContext(c)
	progress.UserID, _ = primitive.ObjectIDFromHex(userData.ID)

	service := services.NewUserCourseProgressService(h.mongoClient)
	updatedProgress, err := service.UpdateCourseProgress(c.Request.Context(), &progress)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, updatedProgress)
}

func (h *UserCourseProgressHandler) GetUserCourseProgress(c *gin.Context) {
	userData := utils.GetUserContext(c)
	userID, _ := primitive.ObjectIDFromHex(userData.ID)

	courseIDStr := c.Query("course_id")
	var courseID primitive.ObjectID
	var err error
	if courseIDStr != "" {
		courseID, err = primitive.ObjectIDFromHex(courseIDStr)
		if err != nil {
			courseID = primitive.NilObjectID
		}
	}

	service := services.NewUserCourseProgressService(h.mongoClient)
	progress, err := service.GetCourseProgress(c.Request.Context(), userID, courseID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, progress)
}

func (h *UserCourseProgressHandler) CreateUserCourseProgress(c *gin.Context) {
	var progress models.UserCourseProgress
	if err := c.ShouldBindJSON(&progress); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid progress data"})
	}
	service := services.NewUserCourseProgressService(h.mongoClient)
	createdProgress, err := service.CreateUserCourseProgress(c.Request.Context(), &progress)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, createdProgress)
}
