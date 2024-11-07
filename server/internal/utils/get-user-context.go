package utils

import (
	"disabled-fpv-server/internal/dto"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetUserContext(c *gin.Context) *dto.AuthResponse {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found in context"})
		c.Abort()
		return nil
	}
	userData, _ := user.(*dto.AuthResponse)
	return userData
}
