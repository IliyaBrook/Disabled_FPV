package handlers

import (
	"disabled-fpv-server/internal/models"
	"disabled-fpv-server/internal/services"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"strconv"
)

type ProductHandler struct {
	mongoClient *mongo.Client
}

func NewProductHandler(mongoClient *mongo.Client) *ProductHandler {
	return &ProductHandler{mongoClient: mongoClient}
}

func (h *ProductHandler) CreateProduct(c *gin.Context) {
	var product models.Product
	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product data"})
		return
	}

	service := services.NewProductService(h.mongoClient)
	createdProduct, err := service.CreateProduct(c.Request.Context(), &product)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, createdProduct)
}

func (h *ProductHandler) UpdateProduct(c *gin.Context) {
	productID, _ := primitive.ObjectIDFromHex(c.Query("product_id"))
	var product models.Product
	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product data"})
		return
	}

	service := services.NewProductService(h.mongoClient)
	updatedProduct, err := service.UpdateProduct(c.Request.Context(), productID, &product)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, updatedProduct)
}

func (h *ProductHandler) DeleteProduct(c *gin.Context) {
	productID, _ := primitive.ObjectIDFromHex(c.Param("product_id"))

	service := services.NewProductService(h.mongoClient)
	err := service.DeleteProduct(c.Request.Context(), productID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Product deleted"})
}

func (h *ProductHandler) GetAllProducts(c *gin.Context) {
	name := c.Query("name")
	category := c.Query("category")
	page, err := strconv.Atoi(c.DefaultQuery("page", "1"))
	if err != nil || page < 1 {
		page = 1
	}
	limit, err := strconv.Atoi(c.DefaultQuery("limit", "10"))
	if err != nil || limit < 1 {
		limit = 10
	}

	service := services.NewProductService(h.mongoClient)
	products, err := service.GetAllProducts(c.Request.Context(), name, category, page, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, products)
}
