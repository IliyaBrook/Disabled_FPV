package router

import (
	"github.com/gin-contrib/cors"
	_ "github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func NewRouter(mongoClient *mongo.Client) *gin.Engine {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length", "Set-Cookie"},
		AllowCredentials: true,
	}))

	publicRoutes(router, mongoClient)
	authUsersRoutes(router, mongoClient)
	adminRoutes(router, mongoClient)
	router.RemoveExtraSlash = true
	return router
}
