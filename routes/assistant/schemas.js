const S = require('fluent-schema')

const statelessMessageBody = S.object()
  .additionalProperties(false)
  .prop('input', S.object().prop('message_type', S.string().required()).prop('text', S.string().required()))
  .prop('context', S.object())

const statefulMessageBody = S.object()
  .additionalProperties(false)
  .prop('input', S.object().prop('message_type', S.string().required()).prop('text', S.string().required()))

const postAssistant200 = S.object()
  .additionalProperties(true)

const defaultError = S.object()
  .additionalProperties(false)
  .prop('error', S.string().required())
  .prop('message', S.string().required())

const postSendStatelessMessageSchema = {
  description: 'Send message',
  summary: 'Send message',
  tags: ['Assistant'],
  body: statelessMessageBody,
  response: { 200: postAssistant200, 409: defaultError }
}

const postSendStatefulMessageSchema = {
  description: 'Send message',
  summary: 'Send message',
  tags: ['Assistant'],
  querystring: S.object()
    .additionalProperties(false)
    .prop('sessionId', S.string().description('The string of sessionId')
    .raw({ pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}' })),
  body: statefulMessageBody,
  response: { 200: postAssistant200, 409: defaultError }
}

module.exports = {
  postSendStatefulMessageSchema,
  postSendStatelessMessageSchema
}
