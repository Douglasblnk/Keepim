import type { UserModel } from './../models/user'

export interface UserDTO {
  username: string
  name: string
  email: string
}

export const userDto = (user: UserModel): UserDTO => {
  return {
    username: user.username,
    name: user.name,
    email: user.email,
  }
}
