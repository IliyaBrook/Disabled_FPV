package handlers

import (
	"disabled-fpv-server/internal/models"
	"disabled-fpv-server/internal/services"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"strconv"
)

type CourseHandler struct {
	mongoClient *mongo.Client
}

func NewCourseHandler(mongoClient *mongo.Client) *CourseHandler {
	return &CourseHandler{mongoClient: mongoClient}
}

func (h *CourseHandler) CreateCourse(c *gin.Context) {
	var course models.Course
	if err := c.ShouldBindJSON(&course); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course data"})
		return
	}

	service := services.NewCourseService(h.mongoClient)
	createdCourse, err := service.CreateCourse(c.Request.Context(), &course)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, createdCourse)
}

func (h *CourseHandler) UpdateCourse(c *gin.Context) {
	courseID := c.Param("course_id")
	courseObjID, _ := primitive.ObjectIDFromHex(courseID)

	var updatedCourse models.Course
	if err := c.ShouldBindJSON(&updatedCourse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course data"})
		return
	}

	service := services.NewCourseService(h.mongoClient)
	course, err := service.UpdateCourse(c.Request.Context(), courseObjID, &updatedCourse)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, course)
}

func (h *CourseHandler) DeleteCourse(c *gin.Context) {
	courseID := c.Param("course_id")
	courseObjID, _ := primitive.ObjectIDFromHex(courseID)

	service := services.NewCourseService(h.mongoClient)
	err := service.DeleteCourse(c.Request.Context(), courseObjID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Course deleted successfully"})
}

func (h *CourseHandler) GetAllCourses(c *gin.Context) {
	name := c.Query("name")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	service := services.NewCourseService(h.mongoClient)
	courses, err := service.GetAllCourses(c.Request.Context(), name, page, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, courses)
}

func (h *CourseHandler) GetCourseById(c *gin.Context) {
	courseID, err := primitive.ObjectIDFromHex(c.Param("course_id"))
	if err != nil || courseID.IsZero() {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course id"})
		return
	}
	pageNumber, _ := strconv.Atoi(c.Query("page_number"))

	service := services.NewCourseService(h.mongoClient)
	course, err := service.GetCourseById(c.Request.Context(), courseID, pageNumber)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if course == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}
	c.JSON(http.StatusOK, course)
}
