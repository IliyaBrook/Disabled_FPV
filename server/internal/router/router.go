package router

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func NewRouter(mongoClient *mongo.Client) *gin.Engine {
	router := gin.Default()
	publicRoutes(router, mongoClient)
	authUsersRoutes(router, mongoClient)
	adminRoutes(router, mongoClient)
	return router
}
