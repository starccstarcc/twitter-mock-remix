import { useNavigate } from '@remix-run/react'
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

export default function SignInPage() {
  const navigate = useNavigate()

  return (
    <Dialog open onOpenChange={e => navigate('/auth')}>
      <DialogContent>
        <div className="flex h-14 items-center gap-6">
          <DialogClose onClick={() => navigate('/auth')} />
          <DialogTitle>Step 1 of 5</DialogTitle>
        </div>
        <article className="mt-5">
          <h2 className="text-4xl font-semibold leading-none tracking-tight">
            Create your account
          </h2>
          <form className="mt-4">
            <fieldset className="grid gap-4">
              <Input label="Name" name="name" required />
              <Input
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </fieldset>
            <fieldset className="mt-8">
              <h3 className="text-3xl font-bold">Date of birth</h3>
              <p className="text-sm text-secondary">
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-2 md:gap-4">
                <Select label="Month" name="month">
                  {MONTHS.map(({ label, value }) => (
                    <SelectOption key={value}>{label}</SelectOption>
                  ))}
                </Select>
                <Select label="Day" name="day">
                  {DAYS.map(({ label, value }) => (
                    <SelectOption key={value}>{label}</SelectOption>
                  ))}
                </Select>
                <Select label="Year" name="year">
                  {YEARS.map(({ label, value }) => (
                    <SelectOption key={value}>{label}</SelectOption>
                  ))}
                </Select>
              </div>
            </fieldset>
            <Button className="mt-8">Next</Button>
          </form>
        </article>
      </DialogContent>
    </Dialog>
  )
}
