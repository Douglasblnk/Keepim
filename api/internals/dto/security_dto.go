package dto

import "time"

type EncryptJWTResponseDTO struct {
	Token      string
	Expiration time.Time
}
