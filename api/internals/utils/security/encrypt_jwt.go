package securityUtils

import (
	"os"
	"photokeep-api/internals/dto"
	"photokeep-api/internals/utils"

	"github.com/golang-jwt/jwt"
)

type JWTPayload map[string]interface{}

func EncryptJWT(payload JWTPayload) (*dto.EncryptJWTResponseDTO, error) {
	claims := jwt.MapClaims{}

	expHour, err := utils.StringToInt(os.Getenv("JWT_EXPIRATION_HOURS"))

	if err != nil {
		return nil, err
	}

	expiration := utils.AddHoursFromNow(expHour)

	claims["exp"] = expiration.Unix()

	for key, value := range payload {
		claims[key] = value
	}

	at := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	token, err := at.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		return nil, err
	}

	response := &dto.EncryptJWTResponseDTO{
		Token:      token,
		Expiration: expiration,
	}

	return response, nil
}
