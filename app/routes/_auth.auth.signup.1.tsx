import {
  json,
  type ActionFunctionArgs,
  redirect,
  type LoaderFunctionArgs,
} from '@remix-run/node'
import { Form, useActionData, useNavigate } from '@remix-run/react'

import { parse } from '@conform-to/zod'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Select, SelectOption } from '~/components/ui/select'
import { MONTHS, DAYS, YEARS } from '~/constants/date'
import { useForm } from '@conform-to/react'
import {
  stepOneOnboardingSchema,
  createOnboardingStepOneSession,
  getOnboardingStepOneData,
} from '~/utils/onboarding.server'
import { getUserByEmail } from '~/models/user.server'

export async function action({ request }: ActionFunctionArgs) {
  const fd = await request.formData()

  const submission = parse(fd, { schema: stepOneOnboardingSchema })

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission)
  }

  const userExists = await getUserByEmail(submission.value.email)
  if (userExists) {
    return redirect('/auth/login')
  }

  return await createOnboardingStepOneSession({
    request,
    redirectTo: '/auth/signup/2',
    value: submission.value,
  })
}

export async function loader({ request }: LoaderFunctionArgs) {
  const onboardingStepOneData = await getOnboardingStepOneData(request)

  if (onboardingStepOneData) {
    return redirect('/auth/signup/2')
  }

  return null
}

export default function SignUpStepOnePage() {
  const navigate = useNavigate()
  const lastSubmission = useActionData<typeof action>()
  const [form, fields] = useForm({
    lastSubmission,
    shouldValidate: 'onBlur',
  })

  return (
    <Dialog open onOpenChange={e => navigate('/auth')}>
      <DialogContent className="max-w-3xl">
        <div className="flex h-14 items-center gap-6">
          <DialogClose onClick={() => navigate('/auth')} />
          <DialogTitle>Step 1 of 2</DialogTitle>
        </div>
        <article className="mt-5">
          <h2 className="text-4xl font-semibold leading-none tracking-tight">
            Create your account
          </h2>
          <Form method="post" className="mt-4" {...form.props}>
            <fieldset className="grid gap-4">
              <Input
                error={fields.email.error}
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                defaultValue={fields.email.defaultValue}
              />
              <Input
                error={fields.name.error}
                label="Name"
                name="name"
                required
                autoComplete="first-name"
                defaultValue={fields.name.defaultValue}
              />
            </fieldset>
            <fieldset className="mt-8">
              <h3 className="text-3xl font-bold">Date of birth</h3>
              <p className="text-sm text-secondary">
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-2 md:gap-4">
                <Select
                  label="Month"
                  name="month"
                  defaultValue={fields.month.defaultValue}
                >
                  {MONTHS.map(({ label, value }) => (
                    <SelectOption key={value} value={value}>
                      {label}
                    </SelectOption>
                  ))}
                </Select>
                <Select
                  label="Day"
                  name="day"
                  defaultValue={fields.day.defaultValue}
                >
                  {DAYS.map(({ label, value }) => (
                    <SelectOption key={value} value={value}>
                      {label}
                    </SelectOption>
                  ))}
                </Select>
                <Select
                  label="Year"
                  name="year"
                  defaultValue={fields.year.defaultValue}
                >
                  {YEARS.map(({ label, value }) => (
                    <SelectOption key={value} value={value}>
                      {label}
                    </SelectOption>
                  ))}
                </Select>
              </div>
            </fieldset>
            <Button className="mt-8">Next</Button>
          </Form>
        </article>
      </DialogContent>
    </Dialog>
  )
}
