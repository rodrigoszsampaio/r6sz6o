const {
  postSendStatelessMessageSchema,
  postSendStatefulMessageSchema
} = require('./schemas')

async function routes (fastify, options) {
  fastify.register(require('../configs/service'))
  fastify.route({ method: 'POST', url: '/assistant/stateless/message', schema: postSendStatelessMessageSchema, handler: postSendStatelessMessageHandler })
  fastify.route({ method: 'POST', url: '/assistant/stateful/message', schema: postSendStatefulMessageSchema, handler: postSendStatefulMessageHandler })
}

async function postSendStatelessMessageHandler (request, reply) {
  try {
    const configs = await this.getByServiceNameConfigs('assistant')
    const config = configs.properties.filter(x => x.default).shift()
    const assistant = this.assistantV2({ ...config })
    const response = await assistant.messageStateless({ assistantId: config.assistantId, ...request.body })
    reply.status(200).send(response.result)
  } catch (error) {
    request.log.error(`${arguments.callee.name} :: error = ${error}`)
    throw error
  }
}

async function postSendStatefulMessageHandler (request, reply) {
  try {
    const configs = await this.getByServiceNameConfigs('assistant')
    const config = configs.properties.filter(x => x.default).shift()
    const assistant = this.assistantV2({ ...config })
    if (!request.query.sessionId) {
      const session = await assistant.createSession({ assistantId: config.assistantId })
      request.query.sessionId = session.result.session_id
    }
    const response = await assistant.message({
      assistantId: config.assistantId,
      sessionId: request.query.sessionId,
      ...request.body
    })
    reply.status(200).send({ ...response.result, sessionId: request.query.sessionId })
  } catch (error) {
    request.log.error(`${arguments.callee.name} :: error = ${error}`)
    throw error
  }
}

module.exports = routes
