package authService

import (
	"os"
	"photokeep-api/internals/models"
	authRepository "photokeep-api/internals/repositories/auth"
	"photokeep-api/internals/utils"
)

func CreateSession(userID string) (*models.Session, error) {
	len, err := utils.StringToInt(os.Getenv("REFRESH_TOKEN_LENGTH"))

	if err != nil {
		return nil, err
	}

	refreshToken := utils.GenerateRandomText(len)

	session := &models.Session{
		UserID: userID,
		RefreshToken: refreshToken,
	}

	_, err = authRepository.CreateSession(session)

	if err != nil {
		return nil, err
	}

	return session, nil
}