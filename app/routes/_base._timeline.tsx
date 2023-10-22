import * as Tabs from '@radix-ui/react-tabs'
import { Link, Outlet, useLocation } from '@remix-run/react'
import { BrandIcon } from '~/components/icons'
import { UserAvatar } from '~/components/ui/avatar'

export default function HomePage() {
  const location = useLocation()

  return (
    <div className="border-secondary sm:max-w-[566px] sm:border-r">
      <div>
        <div className="grid h-[53px] grid-cols-[1fr,max-content,1fr] items-center px-4 sm:hidden">
          <UserAvatar />
          <BrandIcon />
        </div>
        <div className="hidden p-4 text-xl font-bold sm:block">
          <h1>Home</h1>
        </div>
        <Tabs.Root
          value={location.pathname}
          className="border-b border-secondary"
        >
          <Tabs.List className="grid grid-cols-2 justify-items-center">
            <Tabs.Trigger asChild value="/">
              <Link
                to="/"
                className="text-md py-3 font-bold data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                For You
              </Link>
            </Tabs.Trigger>
            <Tabs.Trigger asChild value="/following">
              <Link
                to="/following"
                className="text-md py-3 font-bold data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Following
              </Link>
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </div>
      <Outlet />
    </div>
  )
}
