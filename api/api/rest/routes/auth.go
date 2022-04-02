package routes

import (
	"photokeep-api/api/rest/handlers"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(rg *gin.RouterGroup) {
	rg.POST("/login", handlers.HandleAuth)
}