package middleware

import (
	"disabled-fpv-server/internal/config"
	"disabled-fpv-server/internal/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
)

func AuthMiddleware(jwtServ utils.JWTService, client *mongo.Client, adminOnly bool) gin.HandlerFunc {
	repo := client.Database(config.Env.DbName).Collection("users")
	return func(c *gin.Context) {
		token, err := c.Cookie("auth_token")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token is missing"})
			c.Abort()
			return
		}

		validateRes := jwtServ.ValidateToken(c, token, repo)
		if validateRes.Error != "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": validateRes.Error})
			c.Abort()
			return
		}

		if adminOnly && validateRes.Role != "admin" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Admin access required"})
			c.Abort()
			return
		}

		c.Set("user", validateRes)
		c.Next()
	}
}
