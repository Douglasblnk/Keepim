package exceptions

import "errors"

var ErrAuthorizationFailed = errors.New("Falha na autorização")
var ErrSessionNotFound = errors.New("Sessão não encontrada")
