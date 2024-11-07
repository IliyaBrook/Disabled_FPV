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
	courseProgressHandler := handlers.NewUserCourseProgressHandler(mongoClient)

	r := gin.Default()
	// route groups
	api := r.Group("/api")
	orders := api.Group("/orders")
	courseProgress := api.Group("/courseProgress")
	admin := r.Group("/admin")

	// PUBLIC
	api.POST("/register", userHandler.Register)
	api.POST("/login", userHandler.Login)
	api.POST("/authUser", userHandler.AuthUser)
	api.POST("/logout", userHandler.Logout)

	// AUTHORIZED USERS ONLY
	authMiddleware := middleware.AuthMiddleware(utils.NewJWT(), mongoClient, false)
	api.Use(authMiddleware)
	// orders
	orders.POST("/", orderHandler.CreateOrder)
	orders.GET("/", orderHandler.GetUserOrders)
	// user course progress
	courseProgress.GET("/", courseProgressHandler.GetUserCourseProgress)
	courseProgress.PATCH("/", courseProgressHandler.UpdateCourseProgress)

	// ADMIN ONLY
	adminMiddleware := middleware.AuthMiddleware(utils.NewJWT(), mongoClient, true)
	admin.Use(adminMiddleware)
	// users
	api.GET("/getUserById", userHandler.GetUserByID)
	admin.DELETE("/deleteUser", userHandler.DeleteUser)
	admin.PATCH("/updateUser", userHandler.UpdateUser)
	// products
	admin.POST("/createProduct", productHandler.CreateProduct)
	admin.PATCH("/updateProduct", productHandler.UpdateProduct)
	admin.POST("/deleteProduct", productHandler.DeleteProduct)

	return r
}
