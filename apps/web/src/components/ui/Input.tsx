import { InputHTMLAttributes, forwardRef } from "react"

import { cn } from "@/utils/cn"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      className={cn(
        "h-10 w-full bg-card border border-default py-2 rounded-default px-3 text-sm disabled:cursor-not-allowed focus-visible:outline-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
)
Input.displayName = "Input"

export default Input
