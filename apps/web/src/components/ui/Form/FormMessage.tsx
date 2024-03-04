import { HTMLAttributes, forwardRef, useMemo } from "react"

import { cn } from "@/utils/cn"
import useTranslations from "@/utils/i18n/client"

import { useFormField } from "."

export const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { name, error, formMessageId } = useFormField()
  const { zodErrors } = useTranslations() as {
    zodErrors: Record<string, Record<string, string>>
  }
  const body = useMemo(() => {
    if (!error?.message) {
      return children
    }

    const fieldErrors = zodErrors[name]

    if (!fieldErrors || !fieldErrors[error.message]) {
      return String(error.message)
    }

    return fieldErrors[error.message]
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
