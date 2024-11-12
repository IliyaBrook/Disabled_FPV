package handlers

import (
	"disabled-fpv-server/internal/models"
	"disabled-fpv-server/internal/services"
	"disabled-fpv-server/internal/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
)

// Add cart handlers

type CartHandler struct {
	mongoClient *mongo.Client
}

func NewCartHandler(mongoClient *mongo.Client) *CartHandler {
	return &CartHandler{mongoClient}
}

func (h *CartHandler) AddToCart(c *gin.Context) {
	userData := utils.GetUserContext(c)
	if userData == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	userID, _ := primitive.ObjectIDFromHex(userData.ID)
	var cartProduct models.CartProduct
	if err := c.ShouldBindJSON(&cartProduct); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product data"})
		return
	}

	service := services.NewCartService(h.mongoClient)
	err := service.AddToCart(c.Request.Context(), userID, cartProduct)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Product added to cart"})
}

// Get cart handlers

func (h *CartHandler) GetUserCart(c *gin.Context) {
	userData := utils.GetUserContext(c)
	if userData == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	userID, _ := primitive.ObjectIDFromHex(userData.ID)
	service := services.NewCartService(h.mongoClient)
	cart, err := service.GetUserCart(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, cart)
}

// remove cart handlers

func (h *CartHandler) RemoveProductFromCart(c *gin.Context) {
	userData := utils.GetUserContext(c)
	if userData == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	userID, _ := primitive.ObjectIDFromHex(userData.ID)
	productIDStr := c.Param("product_id")
	productID, err := primitive.ObjectIDFromHex(productIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}

	service := services.NewCartService(h.mongoClient)
	err = service.RemoveFromCart(c.Request.Context(), userID, productID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Product removed from cart"})
}

func (h *CartHandler) Checkout(c *gin.Context) {
	userData := utils.GetUserContext(c)
	if userData == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	userID, _ := primitive.ObjectIDFromHex(userData.ID)
	service := services.NewCartService(h.mongoClient)
	order, err := service.Checkout(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, order)
}
