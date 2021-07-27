import fastify from 'fastify'
import AutoLoad from 'fastify-autoload'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const app = fastify({ logger: true })

function getDirName () {
  const __filename = fileURLToPath(import.meta.url)
  return dirname(__filename)
}

export default async function (fastify, opts) {
  app.register(AutoLoad, {
    dir: join(getDirName(), 'routes')
  })
  
  app.get('/', (_, reply) => {
    reply.send('Hello World!')
  })
  
  app.listen(4000, (err, address) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
    console.log(`server listening on ${address}`);
  })
}