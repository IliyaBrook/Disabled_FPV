package router

import (
	"disabled-fpv-server/internal/handlers"
	middleware "disabled-fpv-server/internal/middlewares"
	"disabled-fpv-server/internal/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func authUsersRoutes(router *gin.Engine, mongoClient *mongo.Client) {
	// handlers
	orderHandler := handlers.NewOrderHandler(mongoClient)
	productHandler := handlers.NewProductHandler(mongoClient)
	courseProgressHandler := handlers.NewUserCourseProgressHandler(mongoClient)
	coursesHandler := handlers.NewCourseHandler(mongoClient)
	coursePagesHandler := handlers.NewCoursePageHandler(mongoClient)
	cartHandler := handlers.NewCartHandler(mongoClient)

	// Groups
	api := router.Group("/api")
	products := api.Group("/products")
	orders := api.Group("/orders")
	courseProgress := api.Group("/courseProgress")
	courses := api.Group("/courses")
	coursePages := api.Group("/coursePages")
	cart := api.Group("/cart")
	// apply middlewares
	authMiddleware := middleware.AuthMiddleware(utils.NewJWT(), mongoClient, false)
	api.Use(authMiddleware)
	products.Use(authMiddleware)
	orders.Use(authMiddleware)
	courseProgress.Use(authMiddleware)
	courses.Use(authMiddleware)
	coursePages.Use(authMiddleware)
	// Routes
	// products
	products.GET("/", productHandler.GetAllProducts)
	// orders
	orders.POST("/", orderHandler.CreateOrder)
	orders.GET("/", orderHandler.GetUserOrders)
	// user-course-progress
	courseProgress.GET("/", courseProgressHandler.GetUserCourseProgress)
	courseProgress.PATCH("/", courseProgressHandler.UpdateCourseProgress)
	courseProgress.POST("/", courseProgressHandler.CreateUserCourseProgress)
	// courses
	courses.GET("/", coursesHandler.GetAllCourses)
	courses.GET("/:course_id", coursesHandler.GetCourseById)
	// course pages
	coursePages.GET("/:course_id/:page_number", coursePagesHandler.GetCoursePageByIdAndPageNum)
	coursePages.GET("/", coursePagesHandler.GetCoursePages)
	// cart
	cart.POST("/add", cartHandler.AddToCart)
	cart.GET("/", cartHandler.GetUserCart)
	cart.DELETE("/:product_id", cartHandler.RemoveProductFromCart)
	cart.POST("/checkout", cartHandler.Checkout)
}
