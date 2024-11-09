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

type CoursePageHandler struct {
	mongoClient *mongo.Client
}

func NewCoursePageHandler(mongoClient *mongo.Client) *CoursePageHandler {
	return &CoursePageHandler{mongoClient: mongoClient}
}

func (h *CoursePageHandler) GetCoursePages(c *gin.Context) {
	courseID := c.Query("course_id")
	pageNumberStr := c.Query("page_number")

	courseObjID, err := primitive.ObjectIDFromHex(courseID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course ID"})
		return
	}

	var pageNumber int
	if pageNumberStr != "" {
		pageNumber, err = strconv.Atoi(pageNumberStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page number"})
			return
		}
	}

	service := services.NewCoursePageService(h.mongoClient)
	pages, err := service.GetPagesByCourseAndNumber(c.Request.Context(), courseObjID, pageNumber)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, pages)
}

func (h *CoursePageHandler) GetCoursePage(c *gin.Context) {
	courseId := c.Query("course_id")
	pageNumber := c.Query("page_number")
	courseObjID, _ := primitive.ObjectIDFromHex(courseId)
	pageNumberObjID, _ := primitive.ObjectIDFromHex(pageNumber)

	service := services.NewCoursePageService(h.mongoClient)
	page, err := service.GetCoursePage(c.Request.Context(), courseObjID, pageNumberObjID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, page)
}

func (h *CoursePageHandler) UpdateCoursePage(c *gin.Context) {
	pageID := c.Param("id")
	pageObjID, _ := primitive.ObjectIDFromHex(pageID)

	var updatedPage models.CoursePage
	if err := c.ShouldBindJSON(&updatedPage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page data"})
		return
	}

	service := services.NewCoursePageService(h.mongoClient)
	page, err := service.UpdateCoursePage(c.Request.Context(), pageObjID, &updatedPage)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, page)
}

func (h *CoursePageHandler) DeleteCoursePage(c *gin.Context) {
	pageID := c.Param("id")
	pageObjID, _ := primitive.ObjectIDFromHex(pageID)

	service := services.NewCoursePageService(h.mongoClient)
	err := service.DeleteCoursePage(c.Request.Context(), pageObjID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Course page deleted successfully"})
}

func (h *CoursePageHandler) AddCoursePage(c *gin.Context) {
	var newPage models.CoursePage
	if err := c.ShouldBindJSON(&newPage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page data"})
		return
	}

	service := services.NewCoursePageService(h.mongoClient)
	page, err := service.AddCoursePage(c.Request.Context(), &newPage)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, page)
}

func (h *CoursePageHandler) GetCoursePagesCount(c *gin.Context) {
	courseID := c.Query("course_id")
	courseObjID, err := primitive.ObjectIDFromHex(courseID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course ID"})
		return
	}

	service := services.NewCoursePageService(h.mongoClient)
	count, err := service.GetCoursePagesCount(c.Request.Context(), courseObjID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"count": count})
}
