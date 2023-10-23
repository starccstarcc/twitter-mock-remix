import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { Link, NavLink, Outlet, useLocation } from '@remix-run/react'
import {
  HomeIcon,
  SearchIcon,
  NotificationsIcon,
  MailIcon,
  BrandIcon,
  AddPostIcon,
} from '~/components/icons'
import { UserAvatar } from '~/components/ui/avatar'

import { getUserId } from '~/utils/user-session.server'

export const meta: MetaFunction = () => {
  return [
    { title: 'Twitter Clone' },
    { name: 'description', content: 'Twitter clone made with Remix' },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request)

  if (!userId) {
    return redirect('/auth')
  }

  return null
}

export default function BaseLayout() {
  return (
    <div className="justify-center sm:flex">
      <div className="grid h-screen overflow-hidden sm:grid-cols-[max-content,minmax(0,1fr)]">
        <DesktopNavigation />
        <Outlet />
        <MobileNavigation />
      </div>
    </div>
  )
}

function DesktopNavigation() {
  return (
    <div className="hidden h-screen w-[88px] grid-rows-[max-content,minmax(0,1fr),max-content] justify-center border-r border-secondary p-4 sm:grid">
      <NavLink to="/" aria-label="Go to homepage" className="p-2">
        <BrandIcon className="h-8 w-8" />
      </NavLink>

      <nav className="mt-8 flex flex-col items-center gap-4">
        <NavLink to="/" aria-label="Go to homepage" className="p-2">
          <HomeIcon />
        </NavLink>
        <NavLink to="/explore" aria-label="Go to explore page" className="p-2">
          <SearchIcon />
        </NavLink>
        <NavLink
          to="/notifications"
          aria-label="Go to notifications page"
          className="p-2"
        >
          <NotificationsIcon />
        </NavLink>
        <NavLink
          to="/messages"
          aria-label="Go to messages page"
          className="p-2"
        >
          <MailIcon />
        </NavLink>
        <NewPostIcon />
      </nav>
      <div className="flex justify-center">
        <UserAvatar />
      </div>
    </div>
  )
}

function NewPostIcon() {
  const location = useLocation()
  const isTimelinePage = ['/home', '/following'].includes(location.pathname)
  const to = isTimelinePage ? `${location.pathname}/tweet` : '/home/tweet'

  return (
    <Link
      to={to}
      aria-label="Add new tweet"
      className="rounded-full bg-primary p-2"
    >
      <AddPostIcon className="h-5 w-5 text-white" />
    </Link>
  )
}

function MobileNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background sm:hidden">
      <ul className="grid grid-cols-4 items-center justify-items-center gap-4">
        <li className="flex h-[50px] items-center">
          <NavLink to="/" aria-label="Go to homepage">
            <HomeIcon />
          </NavLink>
        </li>
        <li className="flex h-[50px] items-center">
          <NavLink to="/explore" aria-label="Go to explore page">
            <SearchIcon />
          </NavLink>
        </li>
        <li className="flex h-[50px] items-center">
          <NavLink to="/notifications" aria-label="Go to notifications page">
            <NotificationsIcon />
          </NavLink>
        </li>
        <li className="flex h-[50px] items-center">
          <NavLink to="/messages" aria-label="Go to messages page">
            <MailIcon />
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
