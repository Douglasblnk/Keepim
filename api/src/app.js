const fastify = require('fastify')
const autoLoad = require('fastify-autoload')

const path = require('path')

function getDirName (join) {
  return path.resolve(__dirname, join);
}

function init(serverFactory) {
  const app = fastify({ serverFactory })

  app.register(autoLoad, {
    dir: getDirName('routes')
  })

  return app
}

if (process.env.NODE_ENV === 'development') {
  const app = init()

  app.listen(4000, (err, address) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    
    console.log(`server listening on ${address}`);
  })
} else {
  console.log('export');
  module.exports = init;
}