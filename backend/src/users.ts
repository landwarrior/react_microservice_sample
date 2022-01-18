import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

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
    try {
      await prisma.users.create({ data })
    } catch (e) {
      console.log(e)
      if (e instanceof PrismaClientKnownRequestError) {
        return e.meta
      }
      return 'ng'
    }
  }
}

export type postData = {
  user_name: string
  age?: number
  sex?: string
  hobby?: string
  job?: string
}

export async function update(user_id: number, data: postData) {
  if (data != null) {
    try {
      await prisma.users.update({
        where: { user_id },
        data
      })
    } catch (e) {
      console.log(e)
      if (e instanceof PrismaClientKnownRequestError) {
        return e.meta
      }
      return 'ng'
    }
  }
}
