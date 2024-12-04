package router

import (
	"disabled-fpv-server/internal/handlers"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func publicRoutes(router *gin.Engine, mongoClient *mongo.Client) {
	// handlers
	userHandler := handlers.NewUserHandler(mongoClient)
	coursesHandler := handlers.NewCourseHandler(mongoClient)
	coursePagesHandler := handlers.NewCoursePageHandler(mongoClient)
	// Groups
	api := router.Group("/api")
	courses := api.Group("/courses")
	coursePages := api.Group("/coursePages")
	// Routes
	api.POST("/register", userHandler.Register)
	api.POST("/login", userHandler.Login)
	api.POST("/authUser", userHandler.AuthUser)
	api.POST("/logout", userHandler.Logout)
	// courses routes
	courses.GET("/", coursesHandler.GetAllCourses)
	courses.GET("/:course_id", coursesHandler.GetCourseById)
	// course pages
	coursePages.GET("/:course_id/:page_number", coursePagesHandler.GetCoursePageByIdAndPageNum)
	coursePages.GET("/", coursePagesHandler.GetCoursePages)
}
