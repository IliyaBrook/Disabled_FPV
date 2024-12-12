package router

import (
	"disabled-fpv-server/internal/config"
	"github.com/gin-contrib/cors"
	_ "github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"strings"
)

func NewRouter(mongoClient *mongo.Client) *gin.Engine {
	router := gin.Default()
	var allowOriginsEnv = config.Env.AllowOrigins
	var AllowOrigins []string
	if allowOriginsEnv != "" {
		AllowOrigins = strings.Split(config.Env.AllowOrigins, ",")
	}
	router.Use(cors.New(cors.Config{
		AllowOrigins:     AllowOrigins,
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
