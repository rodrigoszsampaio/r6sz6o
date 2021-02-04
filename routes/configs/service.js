const fp = require('fastify-plugin')

async function configsService (fastify, options) {
  const configsCollection = fastify.mongo.db.collection('configs')

  fastify.decorate('getConfigs', async (query = {}, limit = 10, page = 1) => {
    return await configsCollection.aggregate([
      { $match: query },
      { $sort: { '_id' : -1 } },
      { $facet: {
        data: [ { $skip: limit * (page - 1) }, { $limit: limit } ],
        metadata: [ { $count: 'total' }, { $addFields: { page: page } } ]
      } }
    ] ).toArray()
  })
  fastify.decorate('postConfigs', async (body) => await configsCollection.insertOne(body))
  fastify.decorate('getByIdConfigs', async (_id) => await configsCollection.findOne({ _id }))
  fastify.decorate('getByServiceNameConfigs', async (serviceName) => await configsCollection.findOne({ serviceName }))
  fastify.decorate('deleteConfigs', async (_id) => await configsCollection.deleteOne({ _id }))
  fastify.decorate('putConfigs', async (_id, body) => await configsCollection.replaceOne({ _id }, body ))
}

module.exports = fp(configsService)
