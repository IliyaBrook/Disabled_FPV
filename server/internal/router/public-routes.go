package router

import (
	"disabled-fpv-server/internal/handlers"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func publicRoutes(router *gin.Engine, mongoClient *mongo.Client) {
	// handlers
	userHandler := handlers.NewUserHandler(mongoClient)
	// Groups
	public := router.Group("/public")
	// Routes
	public.POST("/register", userHandler.Register)
	public.POST("/login", userHandler.Login)
	public.POST("/authUser", userHandler.AuthUser)
	public.POST("/logout", userHandler.Logout)
}
