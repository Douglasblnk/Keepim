import cors from '@middy/http-cors'
import middyJsonBodyParser from '@middy/http-json-body-parser'
import middy from '@middy/core'

export const middyfy = (handler) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(cors({
      credentials: true,
      origin: 'https://keepim.douglasblnk.com',
    }))
}
