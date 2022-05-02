package models

import "time"

type AccessToken struct {
	Token      string
	Expiration time.Time
}
