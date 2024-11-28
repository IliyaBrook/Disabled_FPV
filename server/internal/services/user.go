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
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
	"strings"
	"time"
)

type UserService struct {
	repo *mongo.Collection
}

func NewUserService(client *mongo.Client) *UserService {
	return &UserService{
		repo: client.Database(config.Env.DbName).Collection("users"),
	}
}

func (s *UserService) Register(ctx context.Context, user *models.User) *dto.AuthResponse {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	email := strings.ToLower(user.Email)
	filter := bson.M{"email": strings.ToLower(email)}
	count, err := s.repo.CountDocuments(ctx, filter)
	if err != nil {
		return dto.NewAuthResponse(dto.AuthResponse{
			Error: err.Error(),
		})
	}

	if count > 0 {
		return dto.NewAuthResponse(dto.AuthResponse{
			Error: "user already exists",
		})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return dto.NewAuthResponse(dto.AuthResponse{
			Error: err.Error(),
		})
	}
	user.Password = string(hashedPassword)
	user.Role = "user"

	res, err := s.repo.InsertOne(ctx, user)
	if err != nil {
		return dto.NewAuthResponse(dto.AuthResponse{
			Error: err.Error(),
		})
	}
	jwtServ := utils.NewJWT()
	userID := res.InsertedID.(primitive.ObjectID).Hex()
	token, err := jwtServ.GenerateToken(userID, email)
	if err != nil {
		return dto.NewAuthResponse(dto.AuthResponse{
			Error: err.Error(),
		})
	}
	authResp := dto.NewAuthResponse(dto.AuthResponse{
		ID:        userID,
		Email:     email,
		Token:     token,
		Role:      "user",
		FirstName: user.FirstName,
		LastName:  user.LastName,
	})

	return authResp
}

func (s *UserService) LoginUser(ctx context.Context, creds *models.Credentials) *dto.AuthResponse {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	email := utils.LowercaseTrim(creds.Email)
	filter := bson.M{"email": email}
	var user models.User
	err := s.repo.FindOne(ctx, filter).Decode(&user)
	if errors.Is(err, mongo.ErrNoDocuments) {
		return dto.NewAuthResponse(dto.AuthResponse{
			Error: "invalid credentials",
		})
	} else if err != nil {
		return dto.NewAuthResponse(dto.AuthResponse{
			Error: err.Error(),
		})
	}
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password))
	if err != nil {
		return dto.NewAuthResponse(dto.AuthResponse{
			Error: "invalid credentials",
		})
	}
	jwt := utils.NewJWT()
	stringId := user.ID.Hex()
	token, err := jwt.GenerateToken(stringId, email)
	authResp := dto.NewAuthResponse(dto.AuthResponse{
		ID:        stringId,
		Role:      user.Role,
		Email:     email,
		Token:     token,
		FirstName: user.FirstName,
		LastName:  user.LastName,
	})
	return authResp
}

func (s *UserService) AuthUser(ctx context.Context, token string) *dto.AuthResponse {
	return utils.NewJWT().ValidateToken(ctx, token, s.repo)
}

func (s *UserService) GetUserById(ctx context.Context, userId string, populate []string) (interface{}, error) {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()
	objectId, err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		return nil, err
	}

	if len(populate) == 0 {
		var user models.User
		err := s.repo.FindOne(ctx, bson.M{"_id": objectId}).Decode(&user)
		if err != nil {
			return nil, err
		}
		return &user, nil
	}

	pipeline := mongo.Pipeline{
		bson.D{
			{"$match", bson.M{"_id": objectId}},
		},
	}
	for _, field := range populate {
		switch field {
		case "user_course_progress":
			pipeline = append(pipeline, bson.D{
				{"$lookup", bson.D{
					{"from", "user_course_progress"},
					{"localField", "_id"},
					{"foreignField", "user_id"},
					{"as", "courses"},
				}},
			})
		case "orders":
			pipeline = append(pipeline, bson.D{
				{"$lookup", bson.D{
					{"from", "orders"},
					{"localField", "_id"},
					{"foreignField", "user_id"},
					{"as", "orders"},
				}},
			})
		}
	}

	cursor, err := s.repo.Aggregate(ctx, pipeline)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var results []bson.M
	if err := cursor.All(ctx, &results); err != nil {
		return nil, err
	}
	if len(results) == 0 {
		return nil, mongo.ErrNoDocuments
	}

	return results[0], nil
}

func (s *UserService) DeleteUser(ctx context.Context, userId string) error {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	objectId, err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		return err
	}

	filter := bson.M{"_id": objectId}
	_, err = s.repo.DeleteOne(ctx, filter)
	if err != nil {
		return err
	}

	return nil
}

func (s *UserService) UpdateUser(ctx context.Context, userId string, updatedUser models.User) (*models.User, error) {
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()
	var userResult models.User
	objectId, err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		return nil, err
	}
	filter := bson.M{"_id": objectId}
	updateOptions := options.FindOneAndUpdate().SetReturnDocument(options.After)
	updatedUser.Email = utils.LowercaseTrim(updatedUser.Email)
	existFieldsData := utils.GenerateUpdateData(updatedUser)

	result := s.repo.FindOneAndUpdate(ctx, filter, bson.M{"$set": existFieldsData}, updateOptions)

	if err := result.Decode(&userResult); err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, mongo.ErrNoDocuments
		}
		return nil, err
	}
	return &userResult, nil
}
