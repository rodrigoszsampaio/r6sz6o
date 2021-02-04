const fp = require('fastify-plugin')

async function dbBoot (fastify, options) {
  const db = fastify.mongo.db

  const usersCollection = await db.collection('users')
  await usersCollection.createIndex({ email: 1 }, { unique: true })
  await db.command({
    collMod: usersCollection.collectionName,
    validator: {
      email: { $type: 'string' },
      password: { $type: 'string' }
    }
  })
  const user = await usersCollection.findOne({ email: fastify.config.BOOT_EMAIL })
  if (!user && fastify.config.BOOT_EMAIL) {
    await usersCollection.insertOne({ email: fastify.config.BOOT_EMAIL, password: fastify.getHash(fastify.config.BOOT_PASSWORD) })
  }

  const configsCollection = await db.collection('configs')
  await configsCollection.createIndex({ serviceName: 1 }, { unique: true })
  await db.command({
    collMod: configsCollection.collectionName,
    validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "serviceName", "properties" ],
         properties: {
          serviceName: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          properties: {
            bsonType: "array",
            items: {
              bsonType: "object",
            },
            description: "must be a array of object and is required"
          },
        }
      }
    }
  })
}

module.exports = fp(dbBoot)
