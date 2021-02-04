async function routes (fastify, options) {
  const webSockets = {}

  // fastify.websocketServer.on('connection', webSocket => {
  //   const userID = parseInt(req.params.id, 10)
  //   webSockets[userID] = webSocket
  //   console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(webSockets))
  //   // this.websocketServer.clients.forEach(function each(client) {
  //   //   if (client.readyState === 1) {
  //   //     client.send('connected')
  //   //   }
  //   // })
  // })
  fastify.register(require('../configs/service'))
  fastify.route({
    method: 'GET',
    url: '/chat',
    handler: function (req, reply) {
      this.io.on('connection', (socket) => {
        console.log(socket.rooms); // Set { <socket.id> }
        // socket.join("room1");
        // console.log(socket.rooms); // Set { <socket.id>, "room1" }
        socket.on('new message', (msg) => {
          socket.broadcast.emit('new message', msg)
        })
        // socket.on('close', message => {
        //   socket.end()
        // })
        socket.on("disconnecting", (reason) => {
          for (const room of socket.rooms) {
            if (room !== socket.id) {
              socket.to(room).emit("user has left", socket.id);
            }
            console.log(socket.id); // Set { <socket.id>, "room1" }

          }
        });
      })
      reply.send({ host: 'chat!' })
    }
    // wsHandler: function (conn, req) {
    //   conn.setEncoding('utf8')

    //   conn.socket.on('message', message => {
    //     console.log('received from ' + userID + ': ' + message)
    //     var messageArray = JSON.parse(message)
    //     var toUserWebSocket = webSockets[messageArray[0]]
    //     if (toUserWebSocket) {
    //       console.log('sent to ' + messageArray[0] + ': ' + JSON.stringify(messageArray))
    //       messageArray[0] = userID
    //       toUserWebSocket.send(JSON.stringify(messageArray))
    //     }
    //     // this.websocketServer.clients.forEach(function each(client) {
    //     //   if (client.readyState === 1) {
    //     //     client.send(message)
    //     //   }
    //     // })
    //   })
    //   conn.socket.on('close', message => {
    //     delete webSockets[userID]
    //     console.log('deleted: ' + userID)
    //     conn.end()
    //   })
    // }
  })
}

module.exports = routes
