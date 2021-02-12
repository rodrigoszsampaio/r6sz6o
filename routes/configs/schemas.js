const S = require('fluent-json-schema')

const SERVICES = {
  ASSISTANT: 'assistant',
  DISCOVERY: 'discovery',
}

const assistantPropertiesBody = S.object()
  .additionalProperties(false)
  .prop('default', S.boolean().required())
  .prop('version', S.string().required())
  .prop('apikey', S.string().required())
  .prop('serviceUrl', S.string().required())
  .prop('assistantId', S.string().required())

const objectIdParamSchema = S.object()
  .additionalProperties(false)
  .prop('id', S.string().raw({ pattern: '^[0-9a-fA-F]{24}' }))

const configBody = S.object()
  .additionalProperties(false)
  .prop('serviceName', S.string().enum(Object.values(SERVICES)).default(SERVICES.ASSISTANT).required())
  .prop('properties', S.array().items(S.anyOf([assistantPropertiesBody])).required())

const postConfigs200 = S.object()
  .additionalProperties(false)
  .prop('configId', S.string().required())

const getConfigs200 = S.object()
  .additionalProperties(false)
  .prop('_id', S.string().raw({ pattern: '^[0-9a-fA-F]{24}' }))
  .prop('serviceName', S.string().enum(Object.values(SERVICES)).default(SERVICES.ASSISTANT).required())
  .prop('properties', S.array().required().items(S.anyOf([assistantPropertiesBody])))

const defaultError = S.object()
  .additionalProperties(false)
  .prop('error', S.string().required())
  .prop('message', S.string().required())

const postConfigsSchema = {
  description: 'Create config',
  summary: 'Create config',
  tags: ['Configs'],
  body: configBody,
  response: { 200: postConfigs200, 409: defaultError },
  security: [ { "bearerAuth": [] } ]
}

const putConfigsSchema = {
  description: 'Replace config by id ',
  summary: 'Replace config by id ',
  tags: ['Configs'],
  params: objectIdParamSchema,
  body: configBody,
  response: { 200: postConfigs200, 409: defaultError },
  security: [ { "bearerAuth": [] } ]
}

const deleteConfigsSchema = {
  description: 'Delete config by Id',
  summary: 'Delete config by Id',
  tags: ['Configs'],
  params: objectIdParamSchema,
  response: {
    204: {}
  },
  security: [ { "bearerAuth": [] } ]
}

const getConfigsSchema = {
  description: 'Get paginated list of configs',
  summary: 'Get paginated list of configs',
  tags: ['Configs'],
  querystring: S.object()
    .additionalProperties(false)
    .prop('query', S.string().default('{}').description('The string of mongodb $match e.g.: {"serviceName": "SERVICE_NAME"}'))
    .prop('limit', S.number().minimum(10).maximum(100).default(10).description('The number of items to return'))
    .prop('page', S.number().minimum(1).default(1).description('The number of page to return')),
  response: { 200: S.object()
    .prop('data', S.array().items(getConfigs200))
    .prop('metadata',
    S.array().items(S.object()
    .prop('total', S.number())
    .prop('page', S.number())))
  },
  security: [ { "bearerAuth": [] } ]
}

const getByIdConfigsSchema = {
  description: 'Get configs by Id',
  summary: 'Get configs by Id',
  tags: ['Configs'],
  params: objectIdParamSchema,
  response: { 200: getConfigs200 },
  security: [ { "bearerAuth": [] } ]
}

const postLoginSchema = {
  description: 'Login with a email and password to receive a token',
  summary: 'Login with a email and password to receive a token',
  tags: ['Configs'],
  body: configBody,
  response: { 200: S.object().additionalProperties(false).prop('token', S.string().required()), 401: defaultError }
}

module.exports = {
  postConfigsSchema,
  putConfigsSchema,
  deleteConfigsSchema,
  getConfigsSchema,
  getByIdConfigsSchema,
  postLoginSchema
}
