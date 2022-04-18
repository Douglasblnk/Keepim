package authService

import (
	"fmt"
	"photokeep-api/api/rest/schemas"
)

func SignIn(data *schemas.Login) error {
	user, err := ValidateUser(data.Username, data.Password)
	
	if err != nil {
		fmt.Println("err", err)
		return err
	}
	fmt.Println("user", user)

	return nil
}