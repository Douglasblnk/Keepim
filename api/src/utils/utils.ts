import dayjs from 'dayjs'
import { lambdaErrorResponse } from './lambda'

export const isObjectEmpty = (obj: object) => typeof obj === 'object' && !Object.keys(obj).length

export const getCurrentDate = () => {
  return dayjs().unix()
}

export const generateRandomText = (length: number): string => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  let b = ''

  for (let i = 0; i < length; i++)
    b += charset.charAt(Math.floor(Math.random() * charset.length))

  return b
}

export const isEmail = (username: string) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

  return username.match(emailRegex)
}

export const getError = (error) => {
  if (error && error.name)
    return error.name

  if (error && error.message)
    return error.message

  return error
}

export const handleAuthMiddlewareError = async (error: any) => {
  return lambdaErrorResponse(error)
}

export const getUsernameFromBody = (body: { username?: string }) => {
  if (body.username)
    return body.username

  throw new Error('Missing username')
}
