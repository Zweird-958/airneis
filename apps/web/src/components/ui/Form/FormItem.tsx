import { HTMLAttributes, forwardRef, useId } from "react"

import { cn } from "@/utils/cn"

import {
  FormControl,
  FormDescription,
  FormItemContext,
  FormLabel,
  FormMessage,
} from "."

export const FormItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { label?: string; description?: string }
>(({ className, children, label, description, ...props }, ref) => {
  const id = useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>{children}</FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </div>
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"
