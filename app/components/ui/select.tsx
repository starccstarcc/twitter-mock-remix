import * as React from 'react'

type SelectProps = React.ComponentPropsWithoutRef<'select'> & {
  label: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, className, ...props }, ref) => {
    const id = React.useId()

    return (
      <div className="relative">
        <select
          {...props}
          ref={ref}
          id={id}
          className="block w-full rounded-md border border-secondary bg-background px-2.5 pb-2.5 pt-5 text-sm text-text"
        />
        <label
          htmlFor={id}
          className="absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-secondary outline-none"
        >
          {label}
        </label>
      </div>
    )
  },
)

Select.displayName = 'Select'

const SelectOption = React.forwardRef<
  HTMLOptionElement,
  React.ComponentPropsWithoutRef<'option'>
>((props, ref) => <option ref={ref} {...props} />)

SelectOption.displayName = 'SelectOption'

export { Select, SelectOption, type SelectProps }
