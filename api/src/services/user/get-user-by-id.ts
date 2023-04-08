import { getUser } from '@repository/user'
import { userDto } from '@dto/user'

const getUserById = async (id: string) => {
  const user = await getUser(id)

  return userDto(user)
}

export default getUserById
