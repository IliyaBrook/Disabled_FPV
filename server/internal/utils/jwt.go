package utils

import (
	"context"
	"disabled-fpv-server/internal/config"
	"disabled-fpv-server/internal/dto"
	"disabled-fpv-server/internal/models"
	"errors"
	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"time"
)

var jwtKey = []byte(config.Env.JWTSecret)

type JWTService interface {
	GenerateToken(id, email string) (string, error)
	ParseToken(tokenStr string) (jwt.MapClaims, error)
	ValidateToken(ctx context.Context, tokenStr string, repo *mongo.Collection) *dto.AuthResponse
}

type JWTServ struct{}

func NewJWT() JWTService {
	return &JWTServ{}
}

func (j *JWTServ) GenerateToken(id, email string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &jwt.MapClaims{
		"id":    id,
		"email": email,
		"exp":   expirationTime.Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

func (j *JWTServ) ParseToken(tokenStr string) (jwt.MapClaims, error) {
	claims := &jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil || !token.Valid {
		return nil, err
	}
	return *claims, nil
}

func (j *JWTServ) ValidateToken(ctx context.Context, tokenStr string, repo *mongo.Collection) *dto.AuthResponse {
	claims, err := j.ParseToken(tokenStr)
	if err != nil {
		return dto.NewAuthResponse(dto.AuthResponse{Error: "invalid token"})
	}

	userId, ok := claims["id"].(string)
	if !ok {
		return dto.NewAuthResponse(dto.AuthResponse{Error: "invalid token payload"})
	}
	userObjectId, err := primitive.ObjectIDFromHex(userId)
	var user models.User
	filter := bson.M{"_id": userObjectId}
	err = repo.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return dto.NewAuthResponse(dto.AuthResponse{Error: "not authorized"})
		}
		return dto.NewAuthResponse(dto.AuthResponse{Error: "database error"})
	}
	authResp := dto.NewAuthResponse(dto.AuthResponse{
		ID:    userId,
		Email: user.Email,
		Token: tokenStr,
		Role:  user.Role,
	})
	return authResp
}
