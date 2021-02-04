const isDev = () => [undefined, 'local', 'development'].includes(process.env.NODE_ENV)

const config = {
  logger: {
    redact: ['req.headers.authorization'],
    level: isDev() ? 'debug' : 'info',
    prettyPrint: {
      colorize: isDev(),
      translateTime: isDev(),
    },
    serializers: {
      res (reply) {
        return {
          statusCode: reply.statusCode
        }
      },
      req (request) {
        return {
          method: request.method,
          url: request.url,
          path: request.path,
          parameters: request.parameters,
          // // Including the headers in the log could be in violation of privacy laws, e.g. GDPR.
          // // You should use the "redact" option to remove sensitive fields. It could also leak authentication data in the logs.
          // headers: request.headers,
          remoteAddress: request.ip,
          remotePort: request.socket.remotePort
        };
      }
    }
  }
}

!isDev() && delete config.logger.prettyPrint
module.exports = config
