"use client"

import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"

import useLocale from "@/hooks/useLocale"

export const Select = forwardRef<
  ElementRef<typeof SelectPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Root>
>(({ children, ...props }, ref) => {
  const {
    translations: { forms },
  } = useLocale()

  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger
        ref={ref}
        className="h-10 w-full bg-card border border-default py-2 rounded-default px-3 text-sm disabled:cursor-not-allowed focus-visible:outline-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-between"
      >
        <SelectPrimitive.Value placeholder={forms.selectPlaceholder} />
        <SelectPrimitive.Icon>
          <ChevronDownIcon className="size-4" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="relative max-h-96 min-w-[8rem] overflow-hidden rounded-default shadow-lg border border-default bg-card"
          position="popper"
          sideOffset={2}
        >
          <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1">
            <ChevronUpIcon className="size-4" />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-2 h-[var(--radix-select-trigger-height)] min-w-[var(--radix-select-trigger-width)]">
            {children}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1">
            <ChevronDownIcon className="size-4" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
})
Select.displayName = SelectPrimitive.Root.displayName

export const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Item
    {...props}
    ref={ref}
    className="relative flex justify-between w-full cursor-default select-none items-center rounded-default py-1.5 px-3 text-sm outline-none focus:bg-primary focus:text-white data-[disabled]:opacity-50"
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator>
      <CheckIcon className="size-4" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName
