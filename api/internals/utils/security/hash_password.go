package securityUtils

import (
	"os"
	"photokeep-api/internals/utils"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) ([]byte, error) {
	rounds, err := utils.StringToInt(os.Getenv("SALT_ROUNDS"))

	if err != nil {
		return nil, err
	}
	
	hash, err := bcrypt.GenerateFromPassword([]byte(password), rounds)

	if err != nil {
		return nil, err
	}

	return hash, nil
}
