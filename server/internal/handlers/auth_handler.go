package handlers

import (
	_ "context"
	"disabled-fpv-server/internal/models"
	"disabled-fpv-server/internal/services"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"net/http"
)

type AuthHandler struct {
	mongoClient *mongo.Client
}

func NewAuthHandler(mongoClient *mongo.Client) *AuthHandler {
	return &AuthHandler{
		mongoClient: mongoClient,
	}
}

func (h *AuthHandler) Register(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindBodyWith(&user, binding.JSON); err != nil {
		log.Println("Error binding JSON:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Request Body"})
		return
	}

	service := services.NewAuthService(h.mongoClient)
	resJson := service.Register(c.Request.Context(), &user)
	c.SetCookie("auth_token", resJson.Token, 3600, "/", "", false, true)
	if resJson.Error != "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": resJson.Error})
		return
	}
	c.JSON(http.StatusCreated, resJson)
}

func (h *AuthHandler) Login(c *gin.Context) {
	if c.Request.Method != http.MethodPost {
		http.Error(c.Writer, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	var creds models.Credentials

	if err := c.ShouldBindJSON(&creds); err != nil {
		http.Error(c.Writer, "Invalid Request Body", http.StatusBadRequest)
		return
	}

	service := services.NewAuthService(h.mongoClient)
	resJson := service.LoginUser(c.Request.Context(), &creds)
	c.SetCookie("auth_token", resJson.Token, 3600, "/", "", false, true)
	if resJson.Error != "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": resJson.Error})
		return
	}
	c.JSON(http.StatusCreated, resJson)
}

func (h *AuthHandler) Auth(c *gin.Context) {
	token, err := c.Cookie("auth_token")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token is missing"})
		return
	}

	service := services.NewAuthService(h.mongoClient)
	resJson := service.Auth(c.Request.Context(), token)

	if resJson.Error != "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": resJson.Error})
		return
	}

	c.JSON(http.StatusOK, resJson)
}
