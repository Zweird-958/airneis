import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { ButtonHTMLAttributes, forwardRef } from "react"

const buttonVariants = cva("w-full rounded-default py-2 px-3", {
  variants: {
    color: {
      primary: "bg-primary hover:bg-primary/90 text-primary-foreground",
      disabled: "bg-disabled text-disabled-foreground",
    },
  },
  defaultVariants: {
    color: "primary",
  },
})

type Props = {
  asChild?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, disabled, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button"

    return (
      <Component
        className={buttonVariants({
          className,
          color: disabled ? "disabled" : "primary",
        })}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export default Button
