package utils

import "github.com/go-playground/validator"

type ErrorResponse struct {
    FailedField string
    Tag         string
    Value       string
}

var validate = validator.New()

func ValidateStruct[T any](value T) []*ErrorResponse {
	var errors []*ErrorResponse

	err := validate.Struct(value)

	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element ErrorResponse

			element.FailedField = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()

			errors = append(errors, &element)
		}
	}

	return errors
}