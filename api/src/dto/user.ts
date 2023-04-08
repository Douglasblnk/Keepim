import type { UserModel } from './../models/user'

interface GetUserDTO {
  id: string
  userId: string
  name: string
  email: string
}

export const userDto = (user: UserModel): GetUserDTO => {
  return {
    id: user.id,
    userId: user.userId,
    name: user.name,
    email: user.email,
  }
}
