package main

import (
	"context"
	"disabled-fpv-server/internal/config"
	"disabled-fpv-server/internal/router"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	cfg := config.New()
	cfg.Init()

	mongoDbClient, err := config.MongodbConnect()
	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}
	log.Println("Connected to MongoDB")

	defer func() {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		if err := mongoDbClient.Disconnect(ctx); err != nil {
			log.Println("Failed to disconnect from MongoDB:", err)
		} else {
			log.Println("Disconnected from MongoDB")
		}
	}()

	r := router.NewRouter(mongoDbClient)
	go func() {
		if err := r.Run(":" + cfg.ServerPort); err != nil {
			log.Fatal("Server error:", err)
		}
	}()

	signalChan := make(chan os.Signal, 1)
	signal.Notify(signalChan, syscall.SIGINT, syscall.SIGTERM)
	<-signalChan

	log.Println("Received shutdown signal, shutting down...")
	log.Println("Server gracefully shut down")
}
