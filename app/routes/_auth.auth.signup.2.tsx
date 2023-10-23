import { useForm } from '@conform-to/react'
import { redirect, json } from '@remix-run/node'
import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from '@remix-run/node'
import { Form, useActionData, useNavigate } from '@remix-run/react'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import {
  destroyOnboardingSession,
  getOnboardingStepOneData,
  stepOneOnboardingSchema,
  stepTwoOnboardingSchema,
} from '~/utils/onboarding.server'
import { parse } from '@conform-to/zod'

import { createUser, getUserByEmail, hashPassword } from '~/models/user.server'
import { createUserSession } from '~/utils/user-session.server'

export const meta: MetaFunction = () => {
  return [
    { title: 'Sign Up - Step 2' },
    { name: 'description', content: 'Sign up to twitter clone' },
  ]
}

export async function action({ request }: ActionFunctionArgs) {
  const fd = await request.formData()

  const submission = parse(fd, { schema: stepTwoOnboardingSchema })

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission)
  }
  const stepOneData = await getOnboardingStepOneData(request)

  const parsedStepOneData = stepOneOnboardingSchema.safeParse(stepOneData)

  if (!parsedStepOneData.success) {
    return destroyOnboardingSession({
      request,
      redirectTo: '/auth',
    })
  }

  const { username, password } = submission.value
  const { name, email } = parsedStepOneData.data

  const userExists = await getUserByEmail(email)
  if (userExists) {
    return redirect('/auth/login')
  }

  const hashedPassword = await hashPassword(password)

  const userId = await createUser({
    username,
    password: hashedPassword,
    name,
    email,
  })

  return createUserSession({ request, userId, redirectTo: '/home' })
}

export async function loader({ request }: LoaderFunctionArgs) {
  const stepOneData = await getOnboardingStepOneData(request)

  if (!stepOneData) {
    redirect('/auth/signup/1')
  }

  return null
}

export default function SignUpStepTwoPage() {
  const navigate = useNavigate()
  const lastSubmission = useActionData<typeof action>()
  const [form, fields] = useForm({
    lastSubmission,
    shouldValidate: 'onBlur',
  })

  return (
    <Dialog open onOpenChange={() => navigate('/auth')}>
      <DialogContent className="max-w-3xl">
        <div className="flex h-14 items-center gap-6">
          <DialogClose onClick={() => navigate('/auth')} />
          <DialogTitle>Step 2 of 2</DialogTitle>
        </div>
        <article className="mt-5">
          <h2 className="text-4xl font-semibold leading-none tracking-tight">
            Identify yourself
          </h2>
          <Form method="post" className="mt-4" {...form.props}>
            <fieldset className="grid gap-4">
              <Input
                label="Username"
                name="username"
                required
                error={fields.username.error}
                defaultValue={fields.username.defaultValue}
              />
              <Input
                label="Password"
                name="password"
                required
                autoComplete="new-password"
                type="password"
                error={fields.password.error}
                defaultValue={fields.password.defaultValue}
              />
            </fieldset>
            <Button className="mt-8">Create</Button>
          </Form>
        </article>
      </DialogContent>
    </Dialog>
  )
}
