import type { JwtPayload } from 'jsonwebtoken'

export interface JWTPayload extends JwtPayload {
  sessionID: string
  username: string
}
