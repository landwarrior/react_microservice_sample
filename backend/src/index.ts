import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { main, prisma } from './users'

const server: FastifyInstance = Fastify({})

server.get('/', async (request, reply) => {
  console.log(request.params)
  console.log(request.query)
  return { hello: 'world!' }
})

server.get('/users', async (request, reply) => {
  const users = main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
  return users
})

const start = async () => {
  try {
    // docker で使うためには明示的に 0.0.0.0 を指定する必要がある
    server.listen(3000, '0.0.0.0', function (err, address) {
      if (err) {
        server.log.error(err)
        console.log(err)
        process.exit(1)
      }
      server.log.info(`server listening on ${address}`)
      console.log(`server listening on ${address}`)
    })
  } catch (err) {
    server.log.error(err)
    console.log(err)
    process.exit(1)
  }
}
start()
