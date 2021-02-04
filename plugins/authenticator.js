const fp = require('fastify-plugin')
const crypto = require('crypto')

async function authenticator (fastify, options) {
  fastify.decorate('tokenValidation', async (request) => {
    if (request.headers.authorization) {
      const decoded = fastify.jwt.decode(request.headers.authorization.replace('Bearer ', ''), { complete: false })
      request.log.info(`${arguments.callee.name} :: tokenValidation :: email = ${decoded.email}`)
    }
    await request.jwtVerify()
  })
  fastify.decorate('getHash', (string) => crypto.createHmac('sha256', fastify.config.JWT_SECRET).update(string).digest('hex'))
  fastify.register(require('fastify-jwt'), { secret: fastify.config.JWT_SECRET })
  fastify.register(require('fastify-auth'))
}

module.exports = fp(authenticator)
