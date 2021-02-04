const fp = require('fastify-plugin')

const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

async function watsonAssistant (fastify, options) {
  fastify.decorate('assistantV2', (options) => {
    return new AssistantV2({
      version: options.version,
      authenticator: new IamAuthenticator({
        apikey: options.apikey
      }),
      serviceUrl: options.serviceUrl
    })
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fp(watsonAssistant)
