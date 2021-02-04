const fp = require('fastify-plugin')

async function socketIO (fastify, options) {
  fastify.decorate('io', require('socket.io')(fastify.server, { cors: { origin: true } }))
  fastify.decorate('socketLogs', async (request, reply, payload) => {
    fastify.io.of("/logs").emit('log', `id: ${request.id} -> url: ${request.url} -> body: ${JSON.stringify(request.body)} -> return ${payload}`)
    return payload
  })

  const nspLogs = fastify.io.of("/logs")
  nspLogs.use(async (socket, next) => {
    try {
      await fastify.jwt.verify(socket.handshake.auth.token)
      next()
    } catch (error) {
      next(new Error(error.message))
    }
  })
  nspLogs.on('connection', (socket) => {
    socket.on('new message', (msg) => {
      socket.broadcast.emit('new message', msg)
    })
    socket.on("disconnecting", (reason) => {
      for (const room of socket.rooms) {
        if (room !== socket.id) {
          socket.to(room).emit("user has left", socket.id)
        }
        console.log(reason, socket.id)
      }
    });
  })
}

module.exports = fp(socketIO)
