// Attention Readers:
// Fastify is not designed to run on serverless environments. The Fastify framework is designed to make implementing a traditional HTTP/S server easy.
// Serverless environments requests differently than a standard HTTP/S server; thus, we cannot guarantee it will work as expected with Fastify. Regardless,
// based on the examples given in this document, it is possible to use Fastify in a serverless environment. Again, keep in mind that this is not
// Fastify's intended use case and we do not test for such integration scenarios.

const build = require('./app')
const app = build()
module.exports = async function (req, res) {
  await app.ready()
  app.server.emit('request', req, res)
}
