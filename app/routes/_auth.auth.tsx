import { Link, Outlet } from '@remix-run/react'
import { AppleIcon, BrandIcon, GoogleIcon } from '~/components/icons'
import { Button, buttonVariants } from '~/components/ui/button'

export default function AuthPage() {
  return (
    <div className="flex w-full grow flex-col justify-between lg:items-center lg:justify-center">
      <div className="mx-auto grid max-w-[600px] p-5 lg:container lg:mx-0 lg:max-w-7xl  lg:grid-cols-[3fr,2fr] lg:items-center">
        <BrandIcon
          width={45}
          height={45}
          className="mb-3 lg:h-full lg:max-h-[320px] lg:w-full"
        />
        <main className="flex w-[75vw] max-w-[500px] flex-col">
          <h1 className="my-10 w-3/4 min-w-0 break-words text-[40px] font-bold leading-tight tracking-tight lg:my-12 lg:w-full lg:text-[64px]">
            Happening now
          </h1>
          <article>
            <h2 className="mb-5 text-[23px] font-bold leading-7">
              Join today.
            </h2>
            <div className="flex w-[300px] flex-col gap-4">
              <Button disabled>
                <GoogleIcon className="mr-2 h-4 w-4" />
                Sign up with Google
              </Button>
              <Button disabled>
                <AppleIcon className="mr-2 h-4 w-4" />
                Sign up with Apple
              </Button>
            </div>
            <div className="relative my-2 w-[300px]">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-secondary opacity-50" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2">or</span>
              </div>
            </div>
            <div className="w-[300px]">
              <Link
                to="/auth/signup/1"
                className={buttonVariants({ variant: 'primary' })}
              >
                Create account
              </Link>
              <span className="text-xs tracking-tighter text-secondary">
                By signing up, you agree to the{' '}
                <span className="font-semibold text-primary">
                  Terms of Service
                </span>{' '}
                and{' '}
                <span className="font-semibold text-primary">
                  Privacy Policy
                </span>
                , including{' '}
                <span className="font-semibold text-primary">Cookie Use</span>.
              </span>
              <section className="mt-10 flex flex-col gap-4">
                <h3 className="leading-tighter text-lg font-bold">
                  Already have an account?
                </h3>
                <Button variant="outline">Sign in</Button>
              </section>
            </div>
          </article>
        </main>
      </div>
      <Outlet />
      <Footer />
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mt-10">
      <ul className="flex min-w-0 flex-wrap justify-center gap-2 text-sm font-semibold text-secondary">
        <li>About</li>
        <li>Download the X app</li>
        <li>Help Center</li>
        <li>Terms of Service</li>
        <li>Privacy Policy</li>
        <li>Cookie Policy</li>
        <li>Accessibility</li>
        <li>Ads info</li>
        <li>Blog</li>
        <li>Status</li>
        <li>Careers</li>
        <li>Brand Resources</li>
        <li>Advertising</li>
        <li>Marketing</li>
        <li>X for Business</li>
        <li>Developers</li>
        <li>Directory</li>
        <li>Settings</li>
        <li>© 2023 X Corp.</li>
      </ul>
    </footer>
  )
}
