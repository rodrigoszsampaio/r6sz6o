const fastify = require('fastify')
const path = require('path')

function build(opts = {}) {
  const app = fastify(opts)
  app.register(require('fastify-swagger'), require('./config/swagger'));

  app.register(require('fastify-cors'))
  app.register(require('fastify-compress'), { global: true })
  app.register(require('fastify-helmet'), { contentSecurityPolicy: false })

  app.register(require('./plugins/enviroment'))
  app.register(require('./plugins/authenticator'))
  app.register(require('./plugins/mongo-connector'))
  app.register(require('./plugins/mongo-boot'))
  app.register(require('./plugins/watson-assistant'))
  app.register(require('./plugins/socket-io'))

  app.register(require('./routes/assistant'), { prefix: '/v1' })
  app.register(require('./routes/auth'), { prefix: '/v1' })
  app.register(require('./routes/users'), { prefix: '/v1' })
  app.register(require('./routes/configs'), { prefix: '/v1' })

  const fastifyStatic = require('fastify-static')
  app.register(fastifyStatic, { root: path.join(__dirname, 'public'), prefix: '/' })
  app.get('/', { schema: { tags: ['X-HIDDEN'] } }, (req, reply) => reply.sendFile('index.html'))


  // studies
  app.get('/logs', { schema: { tags: ['X-HIDDEN'] } }, (req, reply) => reply.sendFile('socket.html'))
  app.get('/socket.io.min.js', { schema: { tags: ['X-HIDDEN'] } }, (req, reply) => reply.sendFile('socket.io.min.js'))

  const fs = require('fs')
  app.get('/video', { schema: { tags: ['X-HIDDEN'] } }, (req, reply) => reply.sendFile('video.html'))
  app.get('/movies/:movieName', { schema: { tags: ['X-HIDDEN'] } }, (req, reply) => {
    const { movieName } = req.params
    const movieFile = `./movies/${movieName}`
    fs.stat(movieFile, (err, stats) => {
      if (err) {
        console.log(err)
        return reply.status(404).send('<h1>Movie Not found</h1>')
      }
      const { range } = req.headers
      const { size } = stats
      const start = Number((range || '').replace(/bytes=/, '').split('-')[0])
      const end = size - 1
      const chunkSize = end - start + 1
      reply.headers({
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4'
      })
      const stream = fs.createReadStream(movieFile, { start, end })
      reply.status(206).send(stream)
    })
  })
  return app
}

module.exports = build
