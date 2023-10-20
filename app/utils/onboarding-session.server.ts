import { createCookieSessionStorage } from '@remix-run/node'

export const onboarding = createCookieSessionStorage({
  cookie: {
    name: 'onboarding-session',
    secrets: ['twitter-remix-onboarding'],

    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
})
