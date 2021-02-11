const {
  postUsersSchema,
  getUsersSchema,
  getByIdUsersSchema,
  deleteUsersSchema,
  putUsersSchema
} = require('./schemas')

async function routes (fastify, options) {
  fastify.register(require('./service'))
  fastify.route({ method: 'POST', url: '/users', schema: postUsersSchema, preHandler: fastify.auth([ fastify.tokenValidation ]), handler: postUsersHandler, onSend: fastify.socketLogs })
  fastify.route({ method: 'GET', url: '/users', schema: getUsersSchema, preHandler: fastify.auth([ fastify.tokenValidation ]), handler: getUsersHandler, onSend: fastify.socketLogs })
  fastify.route({ method: 'GET', url: '/users/:id', schema: getByIdUsersSchema, preHandler: fastify.auth([ fastify.tokenValidation ]), handler: getByIdUsersHandler, onSend: fastify.socketLogs })
  fastify.route({ method: 'DELETE', url: '/users/:id', schema: deleteUsersSchema, preHandler: fastify.auth([ fastify.tokenValidation ]), handler: deleteUsersHandler, onSend: fastify.socketLogs })
  fastify.route({ method: 'PUT', url: '/users/:id', schema: putUsersSchema, preHandler: fastify.auth([ fastify.tokenValidation ]), handler: putUsersHandler, onSend: fastify.socketLogs })
}

const DUPLICATE_KEY_ERROR_CODE = 11000

async function getUsersHandler (request, reply) {
  try {
    const query = request.query.query ? JSON.parse(request.query.query.trim()) : {}
    const limit = request.query.limit
    const page = request.query.page
    const response = await this.getUsers(query, limit, page)
    request.log.info(`${arguments.callee.name} replied to user ${request.user.email}`)
    request.log.debug(response[0])
    reply.status(200).send(response[0])
  } catch (error) {
    request.log.error(`${arguments.callee.name} :: error = ${error}`)
    throw error
  }
}


async function postUsersHandler (request, reply) {
  try {
    request.body.password = this.getHash(request.body.password)
    const response = await this.postUsers(request.body)
    request.log.info(`${arguments.callee.name} replied to user ${request.user.email}`)
    reply.status(201).send({ userId: response.insertedId })
  } catch (error) {
    request.log.error(`${arguments.callee.name} :: error = ${error}`)
    if (error.code === DUPLICATE_KEY_ERROR_CODE) {
      reply.status(409).send({ error: 'Conflict', message: 'Email already exists' })
    } else {
      throw error
    }
  }
}

async function getByIdUsersHandler (request, reply) {
  try {
    const _id = this.mongo.ObjectId(request.params.id)
    const response = await this.getByIdUsers(_id)
    request.log.info(`${arguments.callee.name} replied to user ${request.user.email}`)
    request.log.debug(response)
    response ? reply.send(response) : reply.send({})
  } catch (error) {
    request.log.error(`${arguments.callee.name} :: error = ${error}`)
    throw error
  }
}

async function deleteUsersHandler (request, reply) {
  try {
    const _id = this.mongo.ObjectId(request.params.id)
    const user = await this.deleteUsers(_id)
    request.log.info(`${arguments.callee.name} replied to user ${request.user.email}`)
    request.log.debug(user.deletedCount)
    reply.status(204)
  } catch (error) {
    request.log.error(`${arguments.callee.name} :: error = ${error}`)
    throw error
  }
}

async function putUsersHandler (request, reply) {
  try {
    const _id = this.mongo.ObjectId(request.params.id)
    request.body.password = this.getHash(request.body.password)
    const response = await this.putUsers(_id, request.body)
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
