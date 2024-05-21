import { TextareaHTMLAttributes, forwardRef } from "react"

import { cn } from "@airneis/utils"

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "h-28 w-full bg-card border border-default py-2 rounded-default px-3 text-sm disabled:cursor-not-allowed focus-visible:outline-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
)
TextArea.displayName = "TextArea"

export default TextArea
