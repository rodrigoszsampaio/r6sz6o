const fp = require('fastify-plugin')

async function usersService (fastify, options) {
  const usersCollection = fastify.mongo.db.collection('users')

  fastify.decorate('getUsers', async (query = {}, limit = 10, page = 1) => {
    return await usersCollection.aggregate([
      { $match: query },
      { $sort: { '_id' : -1 } },
      { $facet: {
        data: [ { $skip: limit * (page - 1) }, { $limit: limit } ],
        metadata: [ { $count: 'total' }, { $addFields: { page: page } } ]
      } }
    ] ).toArray()
  })
  fastify.decorate('postUsers', async (body) => await usersCollection.insertOne(body))
  fastify.decorate('getByIdUsers', async (_id) => await usersCollection.findOne({ _id }))
  fastify.decorate('getByEmailUsers', async (email) => await usersCollection.findOne({ email }))
  fastify.decorate('deleteUsers', async (_id) => await usersCollection.deleteOne({ _id }))
  fastify.decorate('putUsers', async (_id, body) => await usersCollection.replaceOne({ _id }, body ))
}

module.exports = fp(usersService)
