package rest

import (
	"photokeep-api/api/rest/routes"

	"github.com/gin-gonic/gin"
)

func InitServer() {
	app := gin.Default()
	
	routes.AuthRoutes(app.Group("auth"))

	app.Run(":3000")
}