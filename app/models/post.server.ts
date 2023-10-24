import { db } from 'db'
import { type NewPost, post } from 'db/schema.server'
import { desc } from 'drizzle-orm'

export async function createPost(values: NewPost) {
  const [{ postId }] = await db
    .insert(post)
    .values(values)
    .returning({ postId: post.id })

  return postId
}

export async function getPosts() {
  return db.query.post.findMany({
    with: {
      author: true,
    },
    limit: 20,
    orderBy: desc(post.createdAt),
  })
}
