package authRepository

import (
	"fmt"
	"photokeep-api/api/rest/schemas"
	"photokeep-api/internals/database"
)

func SignIn(data *schemas.Login) error {
	db, err := database.Connect()

	fmt.Println("db", db)
	
	if err != nil {
		return err
	}

	return nil
}