package utils

import (
	"github.com/gofiber/fiber/v2"
)

func GetBody[T any](model T, c *fiber.Ctx) []*ErrorResponse {
	c.BodyParser(model)

	err := ValidateStruct(model)

	if err != nil {
			return err
	}

	return nil
}