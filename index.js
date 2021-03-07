const fastify = require("fastify")({ connectionTimeout: 60000 });
const fetch = require('node-fetch');

fastify.register(require("fastify-cors"), {
  origin: ["https://paimon.moe", "http://localhost:3000"],
});

fastify.route({
  method: "POST",
  url: "/",
  schema: {
    body: {
      url: { type: "string" },
    },
  },
  handler: async (request, reply) => {
    const url = request.body.url;

    try {
      const response = await fetch(url);
      const json = await response.json();
      return reply.send(json);
    } catch (err) {
      reply.code(500).send(err);
    }
  },
});

const start = async () => {
  try {
    const address = await fastify.listen(8000, '0.0.0.0');
    console.log(`paimon.moe cors started at ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
