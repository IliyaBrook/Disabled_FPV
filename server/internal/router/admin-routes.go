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
	admin.GET("/getUserById/:user_id", userHandler.GetUserByID)
	admin.DELETE("/deleteUser/:user_id", userHandler.DeleteUser)
	admin.PATCH("/updateUser/:user_id", userHandler.UpdateUser)
	// products
	admin.POST("/createProduct", productHandler.CreateProduct)
	admin.PATCH("/updateProduct/:product_id", productHandler.UpdateProduct)
	admin.DELETE("/deleteProduct:product_id", productHandler.DeleteProduct)
	// courses
	admin.POST("/createCourse", course.CreateCourse)
	admin.PATCH("/updateCourse/:course_id", course.UpdateCourse)
	admin.DELETE("/deleteCourse/:course_id", course.DeleteCourse)
	// coursePages
	admin.POST("/addCoursePage", coursePagesHandler.AddCoursePage)
	admin.PATCH("/updateCoursePage/:course_id/:page_number", coursePagesHandler.UpdateCoursePage)
	admin.DELETE("/deleteCoursePage/:course_id/:page_number", coursePagesHandler.DeleteCoursePage)
}
