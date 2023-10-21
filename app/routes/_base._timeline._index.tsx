import { Post } from '~/components/post'

export default function HomePage() {
  return (
    <main className="mb-20 overflow-y-auto">
      {Array.from({ length: 10 }).map((_, i) => (
        <Post key={i} />
      ))}
    </main>
  )
}
