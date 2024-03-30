import type { ConfigModel } from '@model/config'
import type { UserDTO } from './user'
import { userDto } from './user'

export interface AccessTokenDTO {
  token: string
  expiration: number
}

export interface SignInResponseDTO {
  accessToken: AccessTokenDTO
  refreshToken: string
  userConfig: ConfigModel
  user: UserDTO
}

export const accessTokenDto = (accessToken: string, expiration: number): AccessTokenDTO => {
  return {
    token: accessToken,
    expiration,
  }
}

export const signInResponseDto = (response: any): SignInResponseDTO => {
  return {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
    userConfig: response.userConfig,
    user: userDto(response.user),
  }
}
