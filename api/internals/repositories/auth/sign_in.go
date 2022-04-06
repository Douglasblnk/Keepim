package authRepository

import (
	"photokeep-api/api/rest/schemas"
	"photokeep-api/internals/database"
)

func SignIn(data *schemas.Login) error {
	db, err := database.Connect()

	if err != nil {
		return err
	}
}