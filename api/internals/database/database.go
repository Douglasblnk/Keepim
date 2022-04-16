package database

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DBClient *mongo.Client

func InitDB() (err error) {
	DBClient, err = mongo.NewClient(
		options.Client().ApplyURI("mongodb://localhost:27017/"),
	)

	if err != nil {
		return err
	}

	return nil
}

func Connect() (*mongo.Client, error) {
	ctx, _ := context.WithTimeout(context.Background(), 30 * time.Second)

	err := DBClient.Connect(ctx)

	if err != nil {
		return nil, err
	}

	return DBClient, nil
}