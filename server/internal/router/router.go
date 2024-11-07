package router

import (
	"disabled-fpv-server/internal/handlers"
	middleware "disabled-fpv-server/internal/middlewares"
	"disabled-fpv-server/internal/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func NewRouter(mongoClient *mongo.Client) *gin.Engine {
	handler := handlers.NewUserHandler(mongoClient)

	r := gin.Default()
	api := r.Group("/api")

	// Public routes
	api.POST("/register", handler.Register)
	api.POST("/login", handler.Login)
	api.POST("/authUser", handler.AuthUser)
	api.POST("/logout", handler.Logout)

	// Protected routes
	authMiddleware := middleware.AuthMiddleware(utils.NewJWT(), mongoClient, false)
	api.Use(authMiddleware)
	api.GET("/getUserById", handler.GetUserByID)
	// Protected routes admin only
	adminGroup := r.Group("/admin")
	adminMiddleware := middleware.AuthMiddleware(utils.NewJWT(), mongoClient, true)
	adminGroup.Use(adminMiddleware)
	adminGroup.POST("/deleteUser", handler.DeleteUser)
	adminGroup.POST("/updateUser", handler.UpdateUser)

	return r
}
