const fastify = require('./app')(
  {
    ignoreTrailingSlash: true,
    bodyLimit: 1_048_576,
    maxParamLength: 100,
    keepAliveTimeout: 5000,
    ...require('./config/logger')
  }
)

async function start () {
  try {
    await fastify.ready()

    if (fastify.isDev()) await fastify.listen(fastify.config.PORT)
    else await fastify.listen(fastify.config.PORT, '0.0.0.0')

    fastify.log.info(`${arguments.callee.name} :: server ready and successfully booted!`, fastify.config)
    fastify.log.debug(fastify.config)
    return fastify
  } catch (e) {
    fastify.log.error(`${arguments.callee.name} :: error = ${e}`)
    process.exit(1)
  }
}

start()
