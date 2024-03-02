"use client"

import * as LabelPrimitive from "@radix-ui/react-label"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"

import { cn } from "@/utils/cn"

export const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn("text-sm font-medium", className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName
