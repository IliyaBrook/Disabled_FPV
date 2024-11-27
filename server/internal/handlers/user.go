package handlers

import (
	_ "context"
	"disabled-fpv-server/internal/dto"
	"disabled-fpv-server/internal/models"
	"disabled-fpv-server/internal/services"
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"net/http"
)

type UserHandler struct {
	mongoClient *mongo.Client
}

func NewUserHandler(mongoClient *mongo.Client) *UserHandler {
	return &UserHandler{
		mongoClient: mongoClient,
	}
}

func (h *UserHandler) Register(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindBodyWith(&user, binding.JSON); err != nil {
		log.Println("Error binding JSON:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Request Body"})
		return
	}

	service := services.NewUserService(h.mongoClient)
	regRes := service.Register(c.Request.Context(), &user)
	c.SetCookie("auth_token", regRes.Token, 3600, "/", "", false, true)
	if regRes.Error != "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": regRes.Error})
		return
	}
	c.JSON(http.StatusCreated, regRes)
}

func (h *UserHandler) Login(c *gin.Context) {
	if c.Request.Method != http.MethodPost {
		http.Error(c.Writer, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	var creds models.Credentials

	if err := c.ShouldBindJSON(&creds); err != nil {
		http.Error(c.Writer, "Invalid Request Body", http.StatusBadRequest)
		return
	}

	service := services.NewUserService(h.mongoClient)
	regRes := service.LoginUser(c.Request.Context(), &creds)
	c.SetCookie("auth_token", regRes.Token, 3600, "/", "", false, true)
	if regRes.Error != "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": regRes.Error})
		return
	}
	c.JSON(http.StatusOK, map[string]string{
		"email": regRes.Email,
		"id":    regRes.ID,
		"role":  regRes.Role,
	})
}

func (h *UserHandler) AuthUser(c *gin.Context) {
	token, err := c.Cookie("auth_token")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token is missing"})
		return
	}

	service := services.NewUserService(h.mongoClient)
	regRes := service.AuthUser(c.Request.Context(), token)

	if regRes.Error != "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": regRes.Error})
		return
	}

	c.JSON(http.StatusOK, map[string]string{
		"email": regRes.Email,
		"id":    regRes.ID,
		"role":  regRes.Role,
	})
}

func (h *UserHandler) Logout(c *gin.Context) {
	_, err := c.Cookie("auth_token")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token is missing"})
		return
	}

	c.SetCookie("auth_token", "", -1, "/", "", false, true)

	c.JSON(http.StatusOK, gin.H{"message": "Successfully logged out"})
}

func (h *UserHandler) GetUserByID(c *gin.Context) {
	var populateReq dto.PopulateRequest
	_ = c.ShouldBindJSON(&populateReq)

	userID := c.Param("user_id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is missing"})
		return
	}

	service := services.NewUserService(h.mongoClient)
	result, err := service.GetUserById(c.Request.Context(), userID, populateReq.Populate)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, result)
}

func (h *UserHandler) DeleteUser(c *gin.Context) {
	userID := c.Param("user_id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is missing"})
	}

	service := services.NewUserService(h.mongoClient)
	err := service.DeleteUser(c.Request.Context(), userID)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
	}
}

func (h *UserHandler) UpdateUser(c *gin.Context) {
	userID := c.Param("user_id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is missing"})
		return
	}

	service := services.NewUserService(h.mongoClient)
	var updatedUserData models.User
	if err := c.ShouldBindJSON(&updatedUserData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	updatedUser, err := service.UpdateUser(c, userID, updatedUserData)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
	}
	c.JSON(http.StatusOK, updatedUser)
}
