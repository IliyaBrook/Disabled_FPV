package handlers

import (
	"disabled-fpv-server/internal/models"
	"disabled-fpv-server/internal/services"
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

	progress.UserID, _ = primitive.ObjectIDFromHex(c.GetString("user_id"))

	service := services.NewUserCourseProgressService(h.mongoClient)
	updatedProgress, err := service.UpdateCourseProgress(c.Request.Context(), &progress)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, updatedProgress)
}

func (h *UserCourseProgressHandler) GetUserCourseProgress(c *gin.Context) {
	userID, _ := primitive.ObjectIDFromHex(c.GetString("userId"))
	courseID, _ := primitive.ObjectIDFromHex(c.Query("courseId"))

	service := services.NewUserCourseProgressService(h.mongoClient)
	progress, err := service.GetCourseProgress(c.Request.Context(), userID, courseID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, progress)
}
