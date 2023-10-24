import * as ScrollArea from '@radix-ui/react-scroll-area'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { Post } from '~/components/post'
import { getPosts } from '~/models/post.server'
import { getUserId } from '~/utils/user-session.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request)

  if (!userId) {
    return json({ posts: [] })
  }

  const posts = await getPosts()

  return json({
    posts: posts.map(post => ({
      id: post.id,
      content: post.content,
      createdAt: post.createdAt,
      author: {
        id: post.author.id,
        name: post.author.name,
        username: post.author.username,
      },
    })),
  })
}

export default function TimelineSubRoutePage() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <>
      <Outlet />
      <ScrollArea.Root asChild>
        <main className="h-[calc(100vh-120px)] w-full overflow-hidden">
          <ScrollArea.Viewport className="h-full w-full pb-40 sm:pb-0">
            {!posts.length ? (
              <p className="my-10 text-center text-secondary">
                It looks empty? Start following people!
              </p>
            ) : null}
            {posts.map((post, i) => (
              <Post post={post} key={post.id} />
            ))}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="duration-[160ms] flex touch-none select-none p-0.5 transition-colors ease-out data-[orientation=vertical]:w-2.5"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-secondary before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
          </ScrollArea.Scrollbar>
        </main>
      </ScrollArea.Root>
    </>
  )
}
