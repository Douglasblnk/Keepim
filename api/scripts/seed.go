package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"photokeep-api/internals/models"
	securityUtils "photokeep-api/internals/utils/security"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func connect(uri string) (*mongo.Client, context.Context, context.CancelFunc) {
	serverAPIOptions := options.ServerAPI(options.ServerAPIVersion1)

	clientOptions := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPIOptions)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	client, err := mongo.Connect(ctx, clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	return client, ctx, cancel
}

func insertMany(data []interface{}) {
	client, ctx, cancel := connect("mongodb://localhost:27017/")
	defer cancel()

	coll := client.Database(os.Getenv("DB_NAME")).Collection("user")

	coll.InsertMany(ctx, data)
}

func userSeed(client *mongo.Client, ctx context.Context) {
	collection := client.Database(os.Getenv("DB_NAME")).Collection("user")

	cursor, err := collection.Find(ctx, bson.M{})

	if err != nil {
		log.Fatal(err)
	}

	var users []models.User

	if err = cursor.All(ctx, &users); err != nil {
		log.Fatal(err)
	}

	insertValue := make([]interface{}, len(users))
	
	for index := range users {
		user := users[index]

		hash, err := securityUtils.HashPassword("123")
		 
		if err != nil {
			log.Fatal(err)
		}

		user.Password = string(hash)

		insertValue[index] = user
	}

	insertMany(insertValue)
}

func init() { godotenv.Load() }

func main() {
	uri := fmt.Sprintf(
		"mongodb+srv://%s:%s@photokeep.bryt7.mongodb.net/%s?retryWrites=true&w=majority",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
	)

	client, ctx, cancel := connect(uri)
	defer cancel()
	
	userSeed(client, ctx)


	client.Disconnect(ctx)
}