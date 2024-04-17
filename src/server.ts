import fastify from 'fastify'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const app = fastify()

const prisma = new PrismaClient({
  log: ['query'],
})

app.get('/events', async (request, reply) => {
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  })

  const parsedData = createEventSchema.parse(request.body)

  const event = await prisma.event.create({
    data: {
      title: parsedData.title,
      details: parsedData.details,
      maximumAttendees: parsedData.maximumAttendees,
      slug: new Date().toISOString(),
    },
  })

  return reply.status(201).send({ eventId: event.id })
})

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 Server is running at http://localhost:3333/')
})
