import { env } from 'node:process'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import type { JWTPayload } from '@type/jwt-payload'
import { parse } from 'cookie'
import { decode, verify } from 'jsonwebtoken'

export const getAccessToken = (event: CustomAPIGatewayProxyEvent<any, any>) => {
  const cookies = event.headers?.cookie
    || event.headers?.Cookie
    || event.headers?.cookies
    || event.headers?.Cookies

  const parsedCookies = parse(cookies || '')

  return parsedCookies?.access_token
}

export const verifyAccessToken = (accessToken: string): JWTPayload => {
  const jwtSecret = env.JWT_SECRET

  const verified = verify(accessToken, jwtSecret, { complete: true })

  return verified.payload as JWTPayload
}

export const decodeAccessToken = (accessToken: string): JWTPayload => {
  return decode(accessToken) as JWTPayload
}
