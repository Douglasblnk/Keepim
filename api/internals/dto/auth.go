package dto

import "photokeep-api/internals/models"

type SignInResponseDTO struct {
	AccessToken  *models.AccessToken
	RefreshToken string
	User         *UserDTO
}
