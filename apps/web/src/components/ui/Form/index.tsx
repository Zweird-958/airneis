"use client"

import {
  ForwardedRef,
  HTMLAttributes,
  createContext,
  forwardRef,
  useContext,
} from "react"
import {
  FieldPath,
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useFormContext,
} from "react-hook-form"

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

type FormItemContextValue = {
  id: string
}

export const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormInnerProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  HTMLAttributes<HTMLFormElement>,
  "onSubmit"
> & {
  ctx: UseFormReturn<TFieldValues>
  onSubmit: SubmitHandler<TFieldValues>
}

export const FormInner = (
  { ctx, onSubmit, ...props }: FormInnerProps,
  ref: ForwardedRef<HTMLFormElement>,
) => (
  <FormProvider {...ctx}>
    <form ref={ref} onSubmit={ctx.handleSubmit(onSubmit)} {...props} />
  </FormProvider>
)

export const Form = forwardRef(FormInner) as <
  TFieldValues extends FieldValues = FieldValues,
>(
  props: FormInnerProps<TFieldValues>,
) => ReturnType<typeof FormInner>

export * from "./FormControl"
export * from "./FormDescription"
export * from "./FormField"
export * from "./FormItem"
export * from "./RawFormItem"
export * from "./FormLabel"
export * from "./FormMessage"
