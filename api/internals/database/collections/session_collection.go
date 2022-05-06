package collections

import (
	"photokeep-api/internals/database"

	"go.mongodb.org/mongo-driver/mongo"
)

func SessionCollection() *mongo.Collection {
	return database.DBClient.Database("photokeep").Collection("session")
}