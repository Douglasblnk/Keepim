package authRepository

import (
	"photokeep-api/internals/database"
	"photokeep-api/internals/database/collections"
	"photokeep-api/internals/models"

	"go.mongodb.org/mongo-driver/mongo"
)

func CreateSession(data *models.Session) (*mongo.InsertOneResult, error) {
	sessionCollection := collections.SessionCollection()

	result, err := sessionCollection.InsertOne(database.GetContext(), data)

	if err != nil {
		return nil, err
	}

	return result, nil
}