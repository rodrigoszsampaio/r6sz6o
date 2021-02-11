const {
  postConfigsSchema,
  getConfigsSchema,
  getByIdConfigsSchema,
  deleteConfigsSchema,
  putConfigsSchema
} = require('./schemas')

async function routes (fastify, options) {
  fastify.register(require('./service'))
  fastify.route({ method: 'POST', url: '/configs', schema: postConfigsSchema, preHandler: fastify.auth([ fastify.tokenValidation ]), handler: postConfigsHandler, onSend: fastify.socketLogs })
  fastify.route({ method: 'GET', url: '/configs', schema: getConfigsSchema, preHandler: fastify.auth([ fastify.tokenValidation ]), handler: getConfigsHandler, onSend: fastify.socketLogs })
  fastify.route({ method: 'GET', url: '/configs/:id', schema: getByIdConfigsSchema, preHandler: fastify.auth([ fastify.tokenValidation ]), handler: getByIdConfigsHandler, onSend: fastify.socketLogs })
  fastify.route({ method: 'DELETE', url: '/configs/:id', schema: deleteConfigsSchema, preHandler: fastify.auth([ fastify.tokenValidation ]), handler: deleteConfigsHandler, onSend: fastify.socketLogs })
  fastify.route({ method: 'PUT', url: '/configs/:id', schema: putConfigsSchema, preHandler: fastify.auth([ fastify.tokenValidation ]), handler: putConfigsHandler, onSend: fastify.socketLogs })
}

const DUPLICATE_KEY_ERROR_CODE = 11000

async function getConfigsHandler (request, reply) {
  try {
    const query = request.query.query ? JSON.parse(request.query.query.trim()) : {}
    const limit = request.query.limit
    const page = request.query.page
    const response = await this.getConfigs(query, limit, page)
    request.log.info(`${arguments.callee.name} replied to user ${request.user.email}`)
    request.log.debug(response[0])
    reply.status(200).send(response[0])
  } catch (error) {
    request.log.error(`${arguments.callee.name} :: error = ${error}`)
    throw error
  }
}


async function postConfigsHandler (request, reply) {
  try {
    const response = await this.postConfigs(request.body)
    request.log.info(`${arguments.callee.name} replied to user ${request.user.email}`)
    reply.status(201).send({ configId: response.insertedId })
  } catch (error) {
    request.log.error(`${arguments.callee.name} :: error = ${error}`)
    throw error
  }
}

async function getByIdConfigsHandler (request, reply) {
  try {
    const _id = this.mongo.ObjectId(request.params.id)
    const response = await this.getByIdConfigs(_id)
    request.log.info(`${arguments.callee.name} replied to user ${request.user.email}`)
    request.log.debug(response)
    response ? reply.send(response) : reply.send({})
  } catch (error) {
    request.log.error(`${arguments.callee.name} :: error = ${error}`)
    throw error
  }
}

async function deleteConfigsHandler (request, reply) {
  try {
    const _id = this.mongo.ObjectId(request.params.id)
    const user = await this.deleteConfigs(_id)
    request.log.info(`${arguments.callee.name} replied to user ${request.user.email}`)
    request.log.debug(user.deletedCount)
    reply.status(204)
  } catch (error) {
    request.log.error(`${arguments.callee.name} :: error = ${error}`)
    throw error
  }
}

async function putConfigsHandler (request, reply) {
  try {
    const _id = this.mongo.ObjectId(request.params.id)
    request.body.password = this.getHash(request.body.password)
    const response = await this.putConfigs(_id, request.body)
    request.log.info(`${arguments.callee.name} replied to user ${request.user.email}`)
    request.log.debug(response)
    response ? reply.send({ userId: request.params.id }) : reply.send({})
  } catch (error) {
    request.log.error(`${arguments.callee.name} :: error = ${error}`)
    if (error.code === DUPLICATE_KEY_ERROR_CODE) {
      reply.status(409).send({ error: 'Conflict', message: 'Email already exists' })
    } else {
      throw error
    }
  }
}

module.exports = routes
