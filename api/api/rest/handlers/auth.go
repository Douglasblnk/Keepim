package handlers

import (
	"net/http"
	"photokeep-api/api/rest/schemas"
	rutils "photokeep-api/api/rest/utils"
	authRepository "photokeep-api/internals/repositories/auth"

	"github.com/gin-gonic/gin"
)

func HandleAuth(ctx *gin.Context) {
	body, err := rutils.GetBody[schemas.Login](ctx)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err.Error())
	}

	authRepository.SignIn(body)
}