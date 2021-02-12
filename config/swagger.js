const isDev = () => [undefined, 'local', 'development'].includes(process.env.NODE_ENV)

// const {
//   postUsersSchema,
//   getUsersSchema,
//   getByIdUsersSchema,
//   deleteUsersSchema,
//   putUsersSchema
// } = require('../routes/users/schemas')

module.exports = {
  openapi: {
    info: {
      title: 'Fastify Api',
      description: 'Fastify swagger api',
      version: '0.1.0',
    },
    externalDocs: {
      url: 'https://fastify.io',
      description: 'Find more info here',
    },
    components: {
      // "schemas": {
      //   postUsersSchema: postUsersSchema.body.valueOf()
      // },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          description: 'Bearer Authorization. Use value: token',
          name: 'Authorization',
          in: 'header',
          bearerFormat: "JWT",
          scheme: 'bearer'
        }
      }
    },
    tags: [
      { name: 'Assistant', description: 'Watson Assisntant related end-points' },
      { name: 'Auth', description: 'Authorization related end-points' },
      { name: 'Configs', description: 'Configs related end-points' },
      { name: 'Users', description: 'Users related end-points' }
    ]
  },
  routePrefix: '/swagger',
  exposeRoute: isDev()
}
