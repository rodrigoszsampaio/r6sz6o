const fp = require('fastify-plugin')

async function enviroment (fastify) {
  const schema = {
    type: 'object',
    required: [ 'MONGODB_URL', 'JWT_SECRET', 'TOKEN_EXPIRES_IN' ],
    properties: {
      MONGODB_URL: { type: 'string' },
      JWT_SECRET: { type: 'string' },
      TOKEN_EXPIRES_IN: { type: 'string' },
      BOOT_EMAIL: { type: 'string' },
      BOOT_PASSWORD: { type: 'string' },
    }
  }
  const options = {
    dotenv: true,
    confKey: 'config',
    schema: schema,
    data: process.env
  }
  fastify.register(require('fastify-env'), options)
}

module.exports = fp(enviroment)
