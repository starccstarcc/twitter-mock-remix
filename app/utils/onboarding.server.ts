import { createCookieSessionStorage, redirect } from '@remix-run/node'
import { z } from 'zod'

export const stepOneOnboardingSchema = z.object({
  email: z.string().email(),
  name: z.string().max(50),
  year: z.number().min(1900).max(new Date().getFullYear()),
  month: z.number().int().min(1).max(12),
  day: z.number().int().min(1).max(31),
})

type OnboardingStepOneValues = z.infer<typeof stepOneOnboardingSchema>

export const stepTwoOnboardingSchema = z.object({
  username: z.string().max(50),
  password: z.string().min(8),
})

const onboarding = createCookieSessionStorage({
  cookie: {
    name: '__onboarding-session',
    secrets: ['twitter-remix-onboarding'],
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
})

export const STEP_ONE = 'ONBOARDING_STEP_ONE'

export function getOnboardingSession(request: Request) {
  const cookie = request.headers.get('Cookie')
  return onboarding.getSession(cookie)
}

export async function getOnboardingStepOneData(request: Request) {
  const session = await getOnboardingSession(request)
  return session.get(STEP_ONE)
}

export async function destroyOnboardingSession({
  request,
  redirectTo,
}: {
  request: Request
  redirectTo: string
}) {
  const session = await getOnboardingSession(request)
  onboarding.destroySession(session)

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await onboarding.commitSession(session),
    },
  })
}

export async function createOnboardingStepOneSession({
  request,
  value,
  redirectTo,
}: {
  request: Request
  value: OnboardingStepOneValues
  redirectTo: string
}) {
  const session = await getOnboardingSession(request)
  session.set(STEP_ONE, value)

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await onboarding.commitSession(session),
    },
  })
}
