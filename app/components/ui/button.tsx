import * as React from 'react'
import { cn } from '@0xaddm/cn'
import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  'flex w-full items-center justify-center rounded-3xl p-2 font-bold',
  {
    variants: {
      variant: {
        default: 'bg-white text-background',
        primary: 'bg-primary text-white',
        outline: 'border border-secondary bg-transparent text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'
