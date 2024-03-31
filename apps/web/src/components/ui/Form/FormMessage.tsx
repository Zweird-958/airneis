import { HTMLAttributes, forwardRef, useMemo } from "react"

import { useTranslation } from "@/i18n/client"
import { cn } from "@/utils/cn"

import { useFormField } from "."

export const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { name, error, formMessageId } = useFormField()
  const { t } = useTranslation("zodErrors")
  const body = useMemo(() => {
    if (!error?.message) {
      return children
    }

    const [fieldName] = name.split(".")
    const fieldErrors = t(fieldName) as unknown as Record<string, string>
    /**
     * Gets the error message based either on the error message (custom) or the error type
     */
    const customErrorMessage =
      fieldErrors[error?.message] ?? fieldErrors[error?.type]

    if (!customErrorMessage) {
      return String(error.message)
    }

    return customErrorMessage
  }, [children, error?.message, error?.type, name, t])

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-danger", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"
