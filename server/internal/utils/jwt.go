package utils

import (
	"disabled-fpv-server/internal/config"
	"github.com/dgrijalva/jwt-go"
	"time"
)

var jwtKey = []byte(config.Env.JWTSecret)

type JWTService interface {
	GenerateToken(id, email string) (string, error)
	ParseToken(tokenStr string) (jwt.MapClaims, error)
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
