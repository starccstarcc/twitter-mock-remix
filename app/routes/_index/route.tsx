import type { MetaFunction } from '@remix-run/node'
import { Navigation } from './navigation'

export const meta: MetaFunction = () => {
  return [
    { title: 'Twitter Clone' },
    { name: 'description', content: 'Twitter clone made with Remix' },
  ]
}

export default function Index() {
  return (
    <div>
      <Navigation />
    </div>
  )
}
