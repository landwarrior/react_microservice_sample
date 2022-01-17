import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

// A `main` function so that you can use async/await
export async function main() {
  const allUsers = await prisma.users.findMany({
    // include: { posts: true },
  })
  return allUsers
}

export type putData = {
  user_id: number
  user_name: string
  age?: number
  sex?: string
  hobby?: string
  job?: string
}

export async function create(data: putData) {
  if (data != null) {
    await prisma.users.create({ data })
  }
}
