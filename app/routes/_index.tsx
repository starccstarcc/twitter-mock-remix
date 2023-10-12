import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'Twitter Clone' },
    { name: 'description', content: 'Twitter clone made with Remix' },
  ]
}

export default function Index() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to Remix</h1>
    </div>
  )
}
