import { AppleIcon, BrandIcon, GoogleIcon } from '~/components/icons'

export default function LoginPage() {
  return (
    <div>
      <div className="p-5">
        <BrandIcon width={45} height={45} className="mb-3" />
        <main>
          <h1 className="leading-tighter my-10 w-3/4 min-w-0 break-words text-[40px] font-bold tracking-tight">
            Happening now
          </h1>
          <article>
            <h2 className="mb-5 text-[23px] font-bold leading-7">
              Join today.
            </h2>
            <div className="flex flex-col gap-4">
              <button className="flex w-full items-center justify-center rounded-3xl bg-white p-2 text-background">
                <GoogleIcon className="mr-2 h-4 w-4" />
                Sign up with Google
              </button>
              <button className="flex w-full items-center justify-center rounded-3xl bg-white p-2 text-background">
                <AppleIcon className="mr-2 h-4 w-4" />
                Sign up with Apple
              </button>
            </div>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-secondary opacity-50" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2">or</span>
              </div>
            </div>

            <button className="flex w-full items-center justify-center rounded-3xl bg-primary p-2 font-bold">
              Create account
            </button>
            <span className="text-xs tracking-tighter text-secondary">
              By signing up, you agree to the{' '}
              <span className="font-semibold text-primary">
                Terms of Service
              </span>{' '}
              and{' '}
              <span className="font-semibold text-primary">Privacy Policy</span>
              , including
              <span className="font-semibold text-primary">Cookie Use</span>.
            </span>
            <section className="mt-10 flex flex-col gap-4">
              <h3 className="leading-tighter text-lg font-bold">
                Already have an account?
              </h3>
              <button className="flex w-full items-center justify-center rounded-3xl border border-secondary bg-background p-2 font-bold text-primary">
                Sign in
              </button>
            </section>
          </article>
        </main>
      </div>
      <footer className="mt-4">
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
    </div>
  )
}
