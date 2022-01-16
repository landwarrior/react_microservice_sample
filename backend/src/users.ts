import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

// A `main` function so that you can use async/await
export async function main() {
  const allUsers = await prisma.users.findMany({
    // include: { posts: true },
  })
  return allUsers
}
