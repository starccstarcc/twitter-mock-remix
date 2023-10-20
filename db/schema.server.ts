import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'

export const user = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),

    username: text('username').unique().notNull(),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    password: text('password'),

    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  },
  table => {
    return {
      userIdx: index('user_idx').on(table.id),
      emailIdx: uniqueIndex('email_idx').on(table.email),
    }
  },
)

export type NewUser = typeof user.$inferInsert
