import cors from '@middy/http-cors'
import middyJsonBodyParser from '@middy/http-json-body-parser'
import middy from '@middy/core'

export const middyfy = (handler, custom) => {
  const middlewareChain = middy(handler)
    .use(middyJsonBodyParser())
    .use(cors({
      credentials: true,
      origin: 'https://keepim.douglasblnk.com',
    }))

  if (custom)
    middlewareChain.use(custom)

  return middlewareChain
}
