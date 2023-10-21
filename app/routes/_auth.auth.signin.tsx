import { useForm } from '@conform-to/react'
import type { MetaFunction, ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { z } from 'zod'

import { Form, useActionData, useNavigate } from '@remix-run/react'
import { BrandIcon } from '~/components/icons'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { parse } from '@conform-to/zod'
import { createUserSession, login } from '~/utils/user-session.server'

export const meta: MetaFunction = () => {
  return [
    { title: 'Sign In' },
    { name: 'description', content: 'Sign in to twitter clone' },
  ]
}

const signInSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
})

export async function action({ request }: ActionFunctionArgs) {
  const fd = await request.formData()

  const submission = parse(fd, { schema: signInSchema })
  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission)
  }

  const { password, email } = submission.value

  const user = await login({ email, password })

  if (!user) {
    //Manually set error for email field
    submission.intent = 'validate/email'
    submission.error = { email: ['Invalid credentials'] }
    return json(submission)
  }

  return createUserSession({ request, userId: user.id, redirectTo: '/' })
}

export default function SignInPage() {
  const navigate = useNavigate()
  const lastSubmission = useActionData<typeof action>()
  const [form, fields] = useForm({
    lastSubmission,
    shouldValidate: 'onBlur',
  })

  return (
    <Dialog open onOpenChange={() => navigate('/auth')}>
      <DialogContent className="max-w-3xl md:p-8">
        <div className="grid h-14 grid-cols-[max-content,1fr] place-items-center items-center">
          <DialogClose onClick={() => navigate('/auth')} />
          <BrandIcon className="h-12 w-12" />
        </div>
        <article className="mt-24 md:mt-0">
          <DialogTitle className="my-5 text-4xl font-semibold leading-none tracking-tight md:my-8">
            Sign in into X
          </DialogTitle>
          <Form method="post" className="mt-4" {...form.props}>
            <fieldset className="grid gap-4">
              <Input
                label="Email"
                name="email"
                required
                type="email"
                autoComplete="email"
                error={fields.email.error}
                defaultValue={fields.email.defaultValue}
              />
              <Input
                label="Password"
                name="password"
                required
                autoComplete="current-password"
                type="password"
                error={fields.password.error}
                defaultValue={fields.password.defaultValue}
              />
            </fieldset>
            <Button className="mt-8">Sign in</Button>
          </Form>
        </article>
      </DialogContent>
    </Dialog>
  )
}
