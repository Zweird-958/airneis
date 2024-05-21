import * as LabelPrimitive from "@radix-ui/react-label"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"

import { cn } from "@airneis/utils"

import Label from "@/components/ui/Label"

import { useFormField } from "."

export const FormLabel = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-danger", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"
