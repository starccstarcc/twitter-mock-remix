import { createCookieSessionStorage, redirect } from '@remix-run/node'

const USER_SESSION_KEY = 'userId'

export const userSession = createCookieSessionStorage({
  cookie: {
    name: '__user-session',
    secrets: ['twitter-remix-onboarding'],

    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
})

export async function getUserSession(request: Request) {
  const cookie = request.headers.get('Cookie')
  return userSession.getSession(cookie)
}

export async function getUserId(request: Request): Promise<string> {
  const session = await getUserSession(request)
  const userId = session.get(USER_SESSION_KEY)
  return userId
}

export async function createUserSession({
  request,
  userId,
  redirectTo,
}: {
  request: Request
  userId: string
  redirectTo: string
}) {
  const session = await getUserSession(request)
  session.set(USER_SESSION_KEY, userId)

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await userSession.commitSession(session),
    },
  })
}
