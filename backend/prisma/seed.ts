import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const users: any = []

users.push()
users.push()

async function main() {
  try {
    await prisma.users.create({
      data: {
        user_id: 1,
        user_name: 'hoge',
        age: 20,
        sex: 'male',
        hobby: 'none',
        job: 'none',
      },
    })
    await prisma.users.create({
      data: {
        user_id: 2,
        user_name: 'fuga',
        age: 21,
        sex: 'female',
        hobby: 'none',
        job: 'none',
      },
    })
  } catch (e) {
    console.log(e)
  }
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
