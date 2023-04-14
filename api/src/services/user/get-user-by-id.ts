import { findUserByUsername } from '@repository/user'
import { userDto } from '@dto/user'

export default async (id: string) => {
  const user = await findUserByUsername(id)

  return userDto(user)
}
