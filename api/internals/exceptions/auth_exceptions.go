package exceptions

import "errors"

var ErrAuthorizationFailed = errors.New("authorization failed")
var ErrInvalidPassword = errors.New("invalid password")
var ErrSessionNotFound = errors.New("session not found")
