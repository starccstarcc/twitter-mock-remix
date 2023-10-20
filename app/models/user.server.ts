import { db } from 'db'
import { user, type NewUser } from 'db/schema.server'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export async function createUser(values: NewUser) {
  const [{ userId }] = await db
    .insert(user)
    .values(values)
    .returning({ userId: user.id })

  return userId
}

export async function getUserByEmail(email: string) {
  return await db.query.user.findFirst({
    where: eq(user.email, email),
  })
}
