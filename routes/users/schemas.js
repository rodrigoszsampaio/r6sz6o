const S = require('fluent-schema')

const objectIdParamSchema = S.object()
  .additionalProperties(false)
  .prop('id', S.string().raw({ pattern: '^[0-9a-fA-F]{24}' }))

const userBody = S.object()
  .additionalProperties(false)
  .prop('email', S.string().required())
  .prop('password', S.string().required())

const postUsers200 = S.object()
  .additionalProperties(false)
  .prop('userId', S.string().required())

const getUsers200 = S.object()
  .additionalProperties(false)
  .prop('_id', S.string().raw({ pattern: '^[0-9a-fA-F]{24}' }))
  .prop('email', S.string().required())

const defaultError = S.object()
  .additionalProperties(false)
  .prop('error', S.string().required())
  .prop('message', S.string().required())

const postUsersSchema = {
  description: 'Login using email and password to receive access token',
  summary: 'Login using email and password to receive access token',
  tags: ['Users'],
  body: userBody,
  response: { 200: postUsers200, 409: defaultError },
  security: [ { "apiKey": [] } ]
}

const putUsersSchema = {
  description: 'Replace user by id ',
  summary: 'Replace user by id ',
  tags: ['Users'],
  params: objectIdParamSchema,
  body: userBody,
  response: { 200: postUsers200, 409: defaultError },
  security: [ { "apiKey": [] } ]
}

const deleteUsersSchema = {
  description: 'Delete user by Id',
  summary: 'Delete user by Id',
  tags: ['Users'],
  params: objectIdParamSchema,
  response: {
    204: {}
  },
  security: [ { "apiKey": [] } ]
}

const getUsersSchema = {
  description: 'Get paginated list of users',
  summary: 'Get paginated list of users',
  tags: ['Users'],
  querystring: S.object()
    .additionalProperties(false)
    .prop('query', S.string().default('{}').description('The string of mongodb $match e.g.: {"email": "fastify"}'))
    .prop('limit', S.number().minimum(10).maximum(100).default(10).description('The number of items to return'))
    .prop('page', S.number().minimum(1).default(1).description('The number of page to return')),
  response: { 200: S.object()
    .prop('data', S.array().items(getUsers200))
    .prop('metadata',
    S.array().items(S.object()
    .prop('total', S.number())
    .prop('page', S.number())))
  },
  security: [ { "apiKey": [] } ]
}

const getByIdUsersSchema = {
  description: 'Get users by Id',
  summary: 'Get users by Id',
  tags: ['Users'],
  params: objectIdParamSchema,
  response: { 200: getUsers200 },
  security: [ { "apiKey": [] } ]
}

module.exports = {
  postUsersSchema,
  putUsersSchema,
  deleteUsersSchema,
  getUsersSchema,
  getByIdUsersSchema
}
