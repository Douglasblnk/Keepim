package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Connect(uri string) (*mongo.Client, context.Context, context.CancelFunc) {
	serverAPIOptions := options.ServerAPI(options.ServerAPIVersion1)

	clientOptions := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPIOptions)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	client, err := mongo.Connect(ctx, clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	return client, ctx, cancel
}

func InsertMany(data []interface{}) {
	client, ctx, cancel := Connect("mongodb://localhost:27017/")
	defer cancel()

	coll := client.Database(os.Getenv("DB_NAME")).Collection("user")

	coll.InsertMany(ctx, data)
}

func UserSeed(client *mongo.Client, ctx context.Context) {
	collection := client.Database(os.Getenv("DB_NAME")).Collection("user")

	cursor, err := collection.Find(ctx, bson.M{})

	if err != nil {
		log.Fatal(err)
	}

	var users []interface{}

	if err = cursor.All(ctx, &users); err != nil {
		log.Fatal(err)
	}

	InsertMany(users)
}

func init() { godotenv.Load() }

func main() {
	uri := fmt.Sprintf(
		"mongodb+srv://%s:%s@photokeep.bryt7.mongodb.net/%s?retryWrites=true&w=majority",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
	)

	client, ctx, cancel := Connect(uri)
	defer cancel()
	
	UserSeed(client, ctx)


	client.Disconnect(ctx)
}