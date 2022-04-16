package routes

import (
	"photokeep-api/api/rest/handlers"

	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(app *fiber.App) {
	app.Get("/sign-in", handlers.SignInHandler)
}