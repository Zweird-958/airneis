import { Slot } from "@radix-ui/react-slot"
import { ButtonHTMLAttributes, forwardRef } from "react"

import { cn } from "@/utils/cn"

type Props = {
  asChild?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button"

    return (
      <Component
        className={cn(
          "bg-primary w-full rounded-default text-primary-foreground hover:bg-primary/90 py-2 px-3",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export default Button
