const S = require('fluent-schema')

const userBody = S.object()
  .additionalProperties(false)
  .prop('email', S.string().required())
  .prop('password', S.string().required())

const defaultError = S.object()
  .additionalProperties(false)
  .prop('error', S.string().required())
  .prop('message', S.string().required())

const postLoginSchema = {
  description: 'Login with a email and password to receive a token',
  summary: 'Login with a email and password to receive a token',
  tags: ['Auth'],
  body: userBody,
  response: { 200: S.object().additionalProperties(false).prop('token', S.string().required()), 401: defaultError }
}

module.exports = {
  postLoginSchema
}
