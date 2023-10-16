import { Outlet } from '@remix-run/react'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col p-4">
      <Outlet />
    </div>
  )
}
