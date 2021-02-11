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
    // socket.on('new message', (msg) => {
    //   socket.broadcast.emit('new message', msg)
    // })
    socket.on("disconnecting", (reason) => {
      // for (const room of socket.rooms) {
      //   if (room !== socket.id) {
      //     socket.to(room).emit("user has left", socket.id)
      //   }
      // }
      console.log(reason, socket.id)
    })
  })

  const nspChat = fastify.io.of("/chat")
  nspChat.use(async (socket, next) => {
    try {
      await fastify.jwt.verify(socket.handshake.auth.token)
      next()
    } catch (error) {
      next(new Error(error.message))
    }
  })
  let numUsers = 0

  nspChat.on('connection', (socket) => {
    let addedUser = false

    // when the client emits 'new message', this listens and executes
    socket.on('new message', (data) => {
      // we tell the client to execute 'new message'
      socket.broadcast.emit('new message', {
        username: socket.username,
        message: data
      })
    })

    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
      if (addedUser) return

      // we store the username in the socket session for this client
      socket.username = username
      ++numUsers
      addedUser = true
      socket.emit('login', {
        numUsers: numUsers
      })
      // echo globally (all clients) that a person has connected
      socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers
      })
    })

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', () => {
      socket.broadcast.emit('typing', {
        username: socket.username
      })
    })

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', () => {
      socket.broadcast.emit('stop typing', {
        username: socket.username
      })
    })

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
      if (addedUser) {
        --numUsers

        // echo globally that this client has left
        socket.broadcast.emit('user left', {
          username: socket.username,
          numUsers: numUsers
        })
      }
    })
  })
}

module.exports = fp(socketIO)
