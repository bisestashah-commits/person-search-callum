import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.user.deleteMany()

  // Seed initial users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '0412345678',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phoneNumber: '0423456789',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phoneNumber: '0434567890',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Bob Williams',
        email: 'bob@example.com',
        phoneNumber: '0445678901',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        phoneNumber: '0456789012',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Emily Davis',
        email: 'emily@example.com',
        phoneNumber: '0467890123',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Frank Miller',
        email: 'frank@example.com',
        phoneNumber: '0478901234',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Grace Lee',
        email: 'grace@example.com',
        phoneNumber: '0489012345',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Henry Moore',
        email: 'henry@example.com',
        phoneNumber: '0490123456',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Isabella Young',
        email: 'isabella@example.com',
        phoneNumber: '0401234567',
      },
    }),
  ])

  console.log(`Seeded ${users.length} users`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
