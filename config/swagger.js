const isDev = () => [undefined, 'local', 'development'].includes(process.env.NODE_ENV)

module.exports = {
  swagger: {
    info: {
      title: 'Fastify Api',
      description: 'Fastify swagger api',
      version: '0.1.0',
    },
    externalDocs: {
      url: 'https://fastify.io',
      description: 'Find more info here',
    },
    host: 'localhost:3000',
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Assistant', description: 'Watson Assisntant related end-points' },
      { name: 'Auth', description: 'Authorization related end-points' },
      { name: 'Configs', description: 'Configs related end-points' },
      { name: 'Users', description: 'Users related end-points' }
    ],
    securityDefinitions: {
      apiKey: {
        description: 'API Key Authorization Bearer Auth. Format is Authorization: Bearer [token]',
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    }
  },
  routePrefix: '/swagger',
  exposeRoute: isDev(),
}
