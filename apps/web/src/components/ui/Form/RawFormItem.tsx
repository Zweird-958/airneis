import { HTMLAttributes, forwardRef, useId } from "react"

import { FormItemContext } from "."

export const RawFormItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const id = useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} {...props} />
    </FormItemContext.Provider>
  )
})
RawFormItem.displayName = "RawFormItem"
