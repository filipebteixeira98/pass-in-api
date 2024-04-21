import { prisma } from '../src/lib/prisma'

async function seed() {
  await prisma.event.create({
    data: {
      id: 'b747c58f-633c-4b10-ad26-16c99b9b8636',
      title: 'JS Brazil',
      slug: 'js-brazil',
      details:
        'Event for those developers who love to create software using best programming language ever!',
      maximumAttendees: 120,
    },
  })
}

seed().then(() => {
  console.log('🌱 Database has already been seeded!')

  prisma.$disconnect()
})
