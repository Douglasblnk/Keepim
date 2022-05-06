package authRepository

import (
	"photokeep-api/internals/database"
	"photokeep-api/internals/database/collections"
	"photokeep-api/internals/models"

	"go.mongodb.org/mongo-driver/bson"
)

func FindSessionByRefreshToken(refreshToken string) (*models.Session, error) {
	var session *models.Session

	sessionCollection := collections.SessionCollection()

	err := sessionCollection.FindOne(database.GetContext(), bson.M{ "refreshtoken": refreshToken }).Decode(&session)

	if err != nil {
		return nil, err
	}

	return session, nil
}