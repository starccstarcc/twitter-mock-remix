import type { MetaFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { MobileNavigation } from '~/components/mobile-navigation'
import { TopBar } from '~/components/top-bar'

export const meta: MetaFunction = () => {
  return [
    { title: 'Twitter Clone' },
    { name: 'description', content: 'Twitter clone made with Remix' },
  ]
}

export default function BaseLayout() {
  return (
    <div className="flex flex-col">
      <TopBar />
      <Outlet />
      <MobileNavigation />
    </div>
  )
}
