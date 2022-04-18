package userRepository

import (
	"photokeep-api/internals/database"
	"photokeep-api/internals/database/collections"
	"photokeep-api/internals/models"

	"go.mongodb.org/mongo-driver/bson"
)

func FindUserByUsername(username string) (*models.User, error) {
	var user *models.User

	userCollection := collections.UserCollection()

	err := userCollection.FindOne(database.GetContext(), bson.M{}).Decode(&user)

	if err != nil {
		return nil, err
	}

	return user, nil
}