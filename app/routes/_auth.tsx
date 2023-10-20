import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { getUserId } from '~/utils/user-session.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request)

  if (userId) {
    return redirect('/')
  }

  return null
}

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col p-4">
      <Outlet />
    </div>
  )
}
