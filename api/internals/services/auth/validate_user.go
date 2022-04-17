package authService

import (
	"photokeep-api/internals/exceptions"
	"photokeep-api/internals/models"
	userRepository "photokeep-api/internals/repositories/user"
	securityUtils "photokeep-api/internals/utils/security"
)

func ValidateUser(username string, password string) (*models.User, error) {
	user, err := userRepository.FindUserByUsername(username)

	if err != nil {
		return nil, err
	}

	passwordMatches := securityUtils.CompareHash(user.Password, password)

	if !passwordMatches {
		return nil, exceptions.ErrAuthorizationFailed
	}

	return user, nil
}