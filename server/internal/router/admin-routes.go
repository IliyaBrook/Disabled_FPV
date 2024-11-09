package router

import (
	"disabled-fpv-server/internal/handlers"
	middleware "disabled-fpv-server/internal/middlewares"
	"disabled-fpv-server/internal/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func adminRoutes(router *gin.Engine, mongoClient *mongo.Client) {
	// handlers
	userHandler := handlers.NewUserHandler(mongoClient)
	productHandler := handlers.NewProductHandler(mongoClient)
	course := handlers.NewCourseHandler(mongoClient)
	coursePagesHandler := handlers.NewCoursePageHandler(mongoClient)
	// Groups
	admin := router.Group("/admin")
	// apply middlewares
	adminMiddleware := middleware.AuthMiddleware(utils.NewJWT(), mongoClient, true)
	admin.Use(adminMiddleware)
	// Routes
	// users
	admin.GET("/getUserById", userHandler.GetUserByID)
	admin.DELETE("/deleteUser", userHandler.DeleteUser)
	admin.PATCH("/updateUser", userHandler.UpdateUser)
	// products
	admin.POST("/createProduct", productHandler.CreateProduct)
	admin.PATCH("/updateProduct", productHandler.UpdateProduct)
	admin.POST("/deleteProduct", productHandler.DeleteProduct)
	// courses
	admin.POST("/createCourse", course.CreateCourse)
	admin.POST("/updateCourse", course.UpdateCourse)
	admin.POST("/deleteCourse", course.DeleteCourse)
	// coursePages
	admin.POST("/addCoursePage", coursePagesHandler.AddCoursePage)
	admin.PATCH("/updateCoursePage/:id", coursePagesHandler.UpdateCoursePage)
	admin.DELETE("/deleteCoursePage/:id", coursePagesHandler.DeleteCoursePage)
}
