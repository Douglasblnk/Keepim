package database

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DBClient *mongo.Client

func GetContext() context.Context {
	ctx, _ := context.WithTimeout(context.Background(), 30 * time.Second)

	return ctx
}

func InitDB() (err error) {
	DBClient, err = mongo.NewClient(
		options.Client().ApplyURI("mongodb://localhost:27017/"),
	)

	if err != nil {
		return err
	}

	err = DBClient.Connect(GetContext())

	if err != nil {
		return err
	}

	return nil
}