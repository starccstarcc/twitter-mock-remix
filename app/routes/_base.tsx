import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { MobileNavigation } from '~/components/mobile-navigation'
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
    <div className="flex flex-col">
      <Outlet />
      <MobileNavigation />
    </div>
  )
}
