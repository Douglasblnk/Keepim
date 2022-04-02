package rutils

import (
	"github.com/gin-gonic/gin"
)

func GetBody[T any](ctx *gin.Context) (*T, error) {
	var body *T

	err := ctx.BindJSON(&body)

	if err != nil {
		return nil, err
	}

	return body, nil
}