const {
  postLoginSchema,
} = require('./schemas')

async function routes (fastify, options) {
  fastify.register(require('../users/service'))
  fastify.route({ method: 'POST', url: '/auth', schema: postLoginSchema, handler: postLoginHandler, onSend: fastify.socketLogs })
}

async function postLoginHandler (request, reply) {
  try {
    const user = await this.getByEmailUsers(request.body.email)
    if (user) {
      if (user.password !== this.getHash(request.body.password)) {
        reply.status(401).send({ error: 'Unauthorized', message: 'Login unauthorized' });
      } else {
        const token = this.jwt.sign(user, { expiresIn: this.config.TOKEN_EXPIRES_IN })
        reply.status(200).send({ token })
      }
    } else {
      reply.status(401).send({ error: 'Unauthorized', message: 'Login unauthorized' });
    }
  } catch (error) {
    request.log.error(`${arguments.callee.name} :: error = ${error}`)
    throw error
  }
}

module.exports = routes
