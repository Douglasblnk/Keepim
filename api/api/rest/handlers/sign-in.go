package handlers

import (
	"photokeep-api/api/rest/schemas"
	"photokeep-api/api/rest/utils"
	authService "photokeep-api/internals/services/auth"

	"github.com/gofiber/fiber/v2"
)

func SignInHandler(c *fiber.Ctx) error {
	loginSchema := new(schemas.Login)

	if err := utils.GetBody(loginSchema, c); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err)
	}

	response, err := authService.SignIn(loginSchema)
	
	if err != nil {
		return c.Status(fiber.StatusBadRequest).Send([]byte(err.Error()))
  }

  return c.Status(fiber.StatusCreated).JSON(response)
}