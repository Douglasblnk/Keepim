package authService

import (
	"fmt"
	"photokeep-api/internals/models"
	authRepository "photokeep-api/internals/repositories/auth"
	userRepository "photokeep-api/internals/repositories/user"
	securityUtils "photokeep-api/internals/utils/security"
)

func CreateAccessToken(refreshToken string) (*models.AccessToken, error) {
	session, err := authRepository.FindSessionByRefreshToken(refreshToken)

	if err != nil {
		fmt.Println("err", err)
		return nil, err
	}

	fmt.Println("session", session)

	user, err := userRepository.FindUserByUsername(session.UserID)

	if err != nil {
		fmt.Println("err", err)
		return nil, err
	}

	fmt.Println("user", user)

	jwtPayload := securityUtils.JWTPayload{}

	jwtPayload["user_uid"] = user.Username
	jwtPayload["session_uid"] = session.RefreshToken

	token, err := securityUtils.EncryptJWT(jwtPayload)

	if err != nil {
		fmt.Println("err", err)
		return nil, err
	}

	fmt.Println("token", token)

	accessToken := &models.AccessToken{
		Token: token.Token,
		Expiration: token.Expiration,
	}

	return accessToken, nil
}