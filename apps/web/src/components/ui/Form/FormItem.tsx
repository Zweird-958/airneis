import { HTMLAttributes, forwardRef, useId } from "react"

import { cn } from "@airneis/utils"

import {
  FormControl,
  FormDescription,
  FormItemContext,
  FormLabel,
  FormMessage,
} from "."

export const FormItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    label?: string
    description?: string
    hideError?: boolean
  }
>(({ className, children, label, description, hideError, ...props }, ref) => {
  const id = useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>{children}</FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        {!hideError && <FormMessage />}
      </div>
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"
