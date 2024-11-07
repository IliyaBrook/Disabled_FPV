package router

import (
	"disabled-fpv-server/internal/handlers"
	middleware "disabled-fpv-server/internal/middlewares"
	"disabled-fpv-server/internal/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func NewRouter(mongoClient *mongo.Client) *gin.Engine {
	// handlers
	orderHandler := handlers.NewOrderHandler(mongoClient)
	productHandler := handlers.NewProductHandler(mongoClient)
	userHandler := handlers.NewUserHandler(mongoClient)
	course := handlers.NewCourseHandler(mongoClient)
	courseProgressHandler := handlers.NewUserCourseProgressHandler(mongoClient)

	r := gin.Default()
	// route groups
	api := r.Group("/api")
	products := api.Group("/products")
	orders := api.Group("/orders")
	courseProgress := api.Group("/courseProgress")
	admin := r.Group("/admin")
	courses := r.Group("/courses")

	// PUBLIC
	api.POST("/register", userHandler.Register)
	api.POST("/login", userHandler.Login)
	api.POST("/authUser", userHandler.AuthUser)
	api.POST("/logout", userHandler.Logout)

	// AUTHORIZED USERS ONLY
	authMiddleware := middleware.AuthMiddleware(utils.NewJWT(), mongoClient, false)
	api.Use(authMiddleware)
	products.Use(authMiddleware)
	orders.Use(authMiddleware)
	courseProgress.Use(authMiddleware)
	courses.Use(authMiddleware)

	// products
	products.GET("/", productHandler.GetAllProducts)
	// orders
	orders.POST("/", orderHandler.CreateOrder)
	orders.GET("/", orderHandler.GetUserOrders)
	// user course progress
	courseProgress.GET("/", courseProgressHandler.GetUserCourseProgress)
	courseProgress.PATCH("/", courseProgressHandler.UpdateCourseProgress)
	//courses
	courses.GET("/", course.GetAllCourses)
	courses.GET("/byId", course.GetCourseById)

	// ADMIN ONLY
	adminMiddleware := middleware.AuthMiddleware(utils.NewJWT(), mongoClient, true)
	admin.Use(adminMiddleware)
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

	return r
}
