import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import type { PostData } from '../types/PostData'
import type { PutData } from '../types/PutData'

export const prisma = new PrismaClient()

// A `main` function so that you can use async/await
export async function main() {
  const allUsers = await prisma.users.findMany({
    // include: { posts: true },
  })
  return allUsers
}

export async function create(data: PostData) {
  if (data != null) {
    try {
      await prisma.users.create({ data })
    } catch (e) {
      console.log(e)
      if (e instanceof PrismaClientKnownRequestError) {
        return e.meta
      }
      return 'ng'
    } finally {
      await prisma.$disconnect()
    }
  }
}

export async function update(user_id: number, data: PutData) {
  if (data != null) {
    try {
      await prisma.users.update({
        where: { user_id },
        data,
      })
    } catch (e) {
      console.log(e)
      if (e instanceof PrismaClientKnownRequestError) {
        return e.meta
      }
      return 'ng'
    } finally {
      await prisma.$disconnect()
    }
  }
}
