import { HTMLAttributes, forwardRef, useMemo } from "react"

import useLocale from "@/hooks/useLocale"
import { cn } from "@/utils/cn"

import { useFormField } from "."

export const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { name, error, formMessageId } = useFormField()
  const {
    translations: { zodErrors },
  } = useLocale()
  const body = useMemo(() => {
    if (!error?.message) {
      return children
    }

    const [fieldName] = name.split(".")
    const fieldErrors = zodErrors[fieldName]
    /**
     * Gets the error message based either on the error message (custom) or the error type
     */
    const customErrorMessage =
      fieldErrors?.[error.message] ?? fieldErrors?.[error.type]

    if (!customErrorMessage) {
      return String(error.message)
    }

    return customErrorMessage
  }, [children, error, name, zodErrors])

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-error", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"
