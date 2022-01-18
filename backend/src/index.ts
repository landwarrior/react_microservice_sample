import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { main, create, update, prisma } from './users'
import type { putData, postData } from './users'

const server: FastifyInstance = Fastify({})

const S = require('fluent-json-schema')

server.get('/', async (request, reply) => {
  return { hello: 'world!' }
})

server.get('/users', async (request, reply) => {
  console.log(request.body)
  console.log(request.params)
  console.log(request.headers)
  console.log(request.query)
  const users = main()
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
  return users
})

const putBodyJsonSchema = S.object()
  .prop('user_id', S.number().required())
  .prop('user_name', S.string().required())
  .prop('age', S.number())
  .prop('sex', S.string())
  .prop('hobby', S.string())
  .prop('job', S.string())

const putHeadersJsonSchema = S.object().prop(
  'login-user',
  S.string().required()
)

const putSchema = {
  body: putBodyJsonSchema,
  headers: putHeadersJsonSchema,
}

server.put<{ Body: putData }>(
  '/users',
  { schema: putSchema },
  async (request, reply) => {
    console.log(request.body)
    console.log(request.params)
    console.log(request.headers)
    console.log(request.query)
    const ng = await create(request.body)
    if (ng != null) {
      return { code: 400, message: ng }
    }
    return { code: 200, message: 'ok' }
  }
)

const postBodyJsonSchema = S.object()
  .prop('user_name', S.string().required())
  .prop('age', S.number())
  .prop('sex', S.string())
  .prop('hobby', S.string())
  .prop('job', S.string())

const postSchema = {
  body: postBodyJsonSchema,
  headers: putHeadersJsonSchema,
  params: S.object().prop('user_id', S.integer()),
}

server.post<{ Body: postData; Params: { user_id: number } }>(
  '/users/:user_id',
  { schema: postSchema },
  async (request, reply) => {
    console.log(request.body)
    console.log(request.params)
    console.log(request.headers)
    console.log(request.query)
    const ng = await update(request.params.user_id, request.body)
    if (ng != null) {
      return { code: 400, message: ng }
    }
    return { code: 200, message: 'ok' }
  }
)

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
