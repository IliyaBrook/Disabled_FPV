package router

import (
	"disabled-fpv-server/internal/handlers"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func NewRouter(mongoClient *mongo.Client) *gin.Engine {
	handler := handlers.NewAuthHandler(mongoClient)

	r := gin.Default()

	r.POST("/register", handler.Register)
	r.POST("/login", handler.Login)
	r.POST("/auth", handler.Auth)

	return r
}
