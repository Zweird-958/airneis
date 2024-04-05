import { Slot } from "@radix-ui/react-slot"
import { ButtonHTMLAttributes, forwardRef } from "react"

import { cn } from "@/utils/cn"

type Props = {
  asChild?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, disabled, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button"

    return (
      <Component
        className={cn(
          " w-full rounded-default py-2 px-3",
          className,
          disabled
            ? "bg-disabled text-disabled-foreground"
            : "bg-primary hover:bg-primary/90 text-primary-foreground",
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export default Button
