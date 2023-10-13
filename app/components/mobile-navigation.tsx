import { NavLink } from '@remix-run/react'
import { HomeIcon, MailIcon, NotificationsIcon, SearchIcon } from './icons'

export function MobileNavigation() {
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
