package services

import (
	"context"
	"disabled-fpv-server/internal/config"
	"disabled-fpv-server/internal/dto"
	"disabled-fpv-server/internal/models"
	"disabled-fpv-server/internal/utils"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
	"time"
)

type AuthService struct {
	repo *mongo.Collection
}

func NewAuthService(client *mongo.Client) *AuthService {
	return &AuthService{
		repo: client.Database(config.Env.DbName).Collection("users"),
	}
}

func (s *AuthService) Register(ctx context.Context, user *models.User) *dto.AuthResponse {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	filter := bson.M{"email": user.Email}
	count, err := s.repo.CountDocuments(ctx, filter)
	if err != nil {
		return dto.NewAuthResponse("", "", "", err.Error())
	}
	if count > 0 {
		return dto.NewAuthResponse("", "", "", "user already exists")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return dto.NewAuthResponse("", "", "", err.Error())
	}
	user.Password = string(hashedPassword)

	res, err := s.repo.InsertOne(ctx, user)
	if err != nil {
		return dto.NewAuthResponse("", "", "", err.Error())
	}
	jwtServ := utils.NewJWT()
	userID := res.InsertedID.(primitive.ObjectID).Hex()
	token, err := jwtServ.GenerateToken(userID, user.Email)
	if err != nil {
		return dto.NewAuthResponse("", "", "", err.Error())
	}
	authResp := dto.NewAuthResponse(userID, user.Email, token, "")
	return authResp
}

func (s *AuthService) LoginUser(ctx context.Context, creds *models.Credentials) *dto.AuthResponse {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	filter := bson.M{"email": creds.Email}
	var user models.User
	err := s.repo.FindOne(ctx, filter).Decode(&user)
	if errors.Is(err, mongo.ErrNoDocuments) {
		return dto.NewAuthResponse("", "", "", "invalid credentials")
	} else if err != nil {
		return dto.NewAuthResponse("", "", "", err.Error())
	}
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password))
	if err != nil {
		return dto.NewAuthResponse("", "", "", "invalid credentials")
	}
	jwt := utils.NewJWT()
	stringId := user.ID.Hex()
	token, err := jwt.GenerateToken(stringId, user.Email)
	authResp := dto.NewAuthResponse(stringId, user.Email, token, "")
	return authResp
}

func (s *AuthService) Auth(ctx context.Context, token string) *dto.AuthResponse {
	var user models.User
	jwt := utils.NewJWT()
	claim, err := jwt.ParseToken(token)
	if err != nil {
		return dto.NewAuthResponse("", "", "", err.Error())
	}
	userId, ok := claim["id"].(string)
	if !ok {
		return dto.NewAuthResponse("", "", "", "invalid token payload")
	}
	filter := bson.M{"_id": userId}
	err = s.repo.FindOne(ctx, filter).Decode(&user)
	authResp := dto.NewAuthResponse(userId, user.Email, token, "")
	return authResp
}
