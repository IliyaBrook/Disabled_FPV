// .env file content
// SERVER_PORT=5000
//MONGO_USERNAME=root
//MONGO_PASSWORD=4Pqxy_+nJJSh%2MS
//MONGO_URI=mongodb://root:4Pqxy_+nJJSh%2MS@localhost:27017/admin
//JWT_SECRET=+f^a+n^y!HwU9DS+$aPo

package config

import (
	"github.com/joho/godotenv"
	"log"
	"os"
)

var (
	IsProduction = false
	Env          = *New()
)

type Config struct {
	ServerPort    string
	MongoURI      string
	MongoUsername string
	MongoPassword string
	JWTSecret     string
	DbName        string
}

func New() *Config {
	c := &Config{}
	return c
}

func (c *Config) Init() {
	goEnv := os.Getenv("GO_ENV")
	if goEnv != "production" {
		IsProduction = true
		if err := godotenv.Load("../.env"); err != nil {
			log.Fatalf("Error loading .env file")
		}
		c.MongoURI = os.Getenv("MONGO_URI_DEV")
	} else {
		c.MongoURI = os.Getenv("MONGO_URI_PROD")
	}
	c.ServerPort = os.Getenv("SERVER_PORT")
	c.MongoUsername = os.Getenv("MONGO_USERNAME")
	c.MongoPassword = os.Getenv("MONGO_PASSWORD")
	c.JWTSecret = os.Getenv("JWT_SECRET")
	c.DbName = os.Getenv("DB_NAME")
	Env = *c
}
