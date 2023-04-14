import { compareSync } from 'bcryptjs'

export const compareHash = (hash, value) => {
  return compareSync(value, hash)
}
