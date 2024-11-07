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

type OrderHandler struct {
	mongoClient *mongo.Client
}

func NewOrderHandler(mongoClient *mongo.Client) *OrderHandler {
	return &OrderHandler{mongoClient: mongoClient}
}

func (h *OrderHandler) CreateOrder(c *gin.Context) {
	var order models.Order
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid order data"})
		return
	}

	userData := utils.GetUserContext(c)
	if userData == nil {
		return
	}

	order.UserID, _ = primitive.ObjectIDFromHex(userData.ID)

	service := services.NewOrderService(h.mongoClient)
	createdOrder, err := service.CreateOrder(c.Request.Context(), &order)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, createdOrder)
}

func (h *OrderHandler) GetUserOrders(c *gin.Context) {
	orderID := c.Query("order_id")
	userData := utils.GetUserContext(c)
	if userData == nil {
		return
	}

	userID, _ := primitive.ObjectIDFromHex(userData.ID)
	service := services.NewOrderService(h.mongoClient)

	var orders []models.Order
	var err error
	if orderID == "" {
		orders, err = service.GetUserOrders(c.Request.Context(), userID)
	} else {
		orderObjID, _ := primitive.ObjectIDFromHex(orderID)
		orders, err = service.GetUserOrdersById(c.Request.Context(), userID, orderObjID)
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, orders)
}
