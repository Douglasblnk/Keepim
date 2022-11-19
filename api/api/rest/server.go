package rest

import (
	"fmt"
	"log"
	"photokeep-api/api/rest/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func InitServer() {
	app := fiber.New()
	
	app.Use(cors.New(cors.Config{
    AllowOrigins: "http://localhost:5173",
    AllowHeaders:  "Origin, Content-Type, Accept",
	}))

	routes.SetUpRoutes(app)

	if err := app.Listen(":3000"); err != nil {
			log.Fatal(err)
	}

	fmt.Println("Listening in port 3000")
}