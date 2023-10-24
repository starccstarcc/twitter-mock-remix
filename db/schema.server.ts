import { relations } from 'drizzle-orm'
import {
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
      userIdx: uniqueIndex('user_idx').on(table.id),
      emailIdx: uniqueIndex('email_idx').on(table.email),
    }
  },
)

export type NewUser = typeof user.$inferInsert
export type User = typeof user.$inferSelect

export const userRelations = relations(user, ({ many }) => ({
  posts: many(post),
}))

export const post = pgTable(
  'posts',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    authorId: uuid('author_id').notNull(),

    content: text('content').notNull(),

    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  },
  table => {
    return {
      postIdx: uniqueIndex('post_idx').on(table.id),
      authorIdx: uniqueIndex('author_id_idx').on(table.authorId),
    }
  },
)

export type NewPost = typeof post.$inferInsert
export type Post = typeof post.$inferSelect

export const postsRelations = relations(post, ({ one }) => ({
  author: one(user, {
    fields: [post.authorId],
    references: [user.id],
  }),
}))
