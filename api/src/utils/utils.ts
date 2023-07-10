import dayjs from 'dayjs'

export const isObjectEmpty = (obj: Object) => typeof obj === 'object' && !Object.keys(obj).length

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
