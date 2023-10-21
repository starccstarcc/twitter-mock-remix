import * as Tabs from '@radix-ui/react-tabs'
import { Link, Outlet, useLocation } from '@remix-run/react'
import { BrandIcon } from '~/components/icons'
import { UserAvatar } from '~/components/ui/avatar'

export default function HomePage() {
  const location = useLocation()

  return (
    <div className="fixed top-0">
      <div className="grid h-[53px] grid-cols-[1fr,max-content,1fr] items-center px-4">
        <UserAvatar />
        <BrandIcon />
      </div>
      <div>
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
              <Link to="/following" className="text-md py-3 font-bold">
                Following
              </Link>
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
        <Outlet />
      </div>
    </div>
  )
}
