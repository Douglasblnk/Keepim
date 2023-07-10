export const errMissingParams = () => ({ error: 'Parâmetros ausentes', statusCode: 400 })
export const errAuthorizationFailed = () => ({ error: 'Falha na autenticação', statusCode: 401 })
export const errSessionNotFound = () => ({ error: 'Sessão não encontrada', statusCode: 404 })
