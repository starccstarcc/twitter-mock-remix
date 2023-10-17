import { cn } from '@0xaddm/cn'
import * as React from 'react'

type InputProps = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'placeholder' | 'id'
> & {
  label: string
  error?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    const id = React.useId()
    const errorId = React.useId()

    return (
      <div className="relative">
        <input
          ref={ref}
          id={id}
          className={cn(
            'peer block w-full rounded-md border border-secondary bg-background px-2.5 pb-2.5 pt-5 text-sm text-text',
            {
              'border-red-600 outline-red-600': !!error,
            },
          )}
          placeholder=""
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            'absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-secondary outline-none duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-secondary',
            {
              'text-red-600 peer-focus:text-red-600': !!error,
            },
          )}
        >
          {label}
        </label>
        {error ? (
          <span id={errorId} className="mt-2 text-xs text-red-600">
            {error}
          </span>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
