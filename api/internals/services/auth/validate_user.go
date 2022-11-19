package authService

import (
	"photokeep-api/internals/dto"
	"photokeep-api/internals/exceptions"
	userRepository "photokeep-api/internals/repositories/user"
	securityUtils "photokeep-api/internals/utils/security"
)

func ValidateUser(username string, password string) (*dto.UserDTO, error) {
	user, err := userRepository.FindUserByUsername(username)

	if err != nil {
		return nil, exceptions.ErrAuthorizationFailed
	}

	passwordMatches := securityUtils.CompareHash(user.Password, password)

	if !passwordMatches {
		return nil, exceptions.ErrAuthorizationFailed
	}

	userDTO := &dto.UserDTO{
		Name: user.Name,
		Username: user.Username,
	}
	
	return userDTO, nil
}