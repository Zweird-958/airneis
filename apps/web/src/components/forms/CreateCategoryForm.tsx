"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { CreateCategoryInput, createCategorySchema } from "@airneis/schemas"

import Button from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import useErrorHandler from "@/hooks/useErrorHandler"
import useLocale from "@/hooks/useLocale"
import api from "@/trpc/client"
import fieldDefaultValues from "@/utils/locale/fieldDefaultValues"

import ImageField from "./fields/ImageField"
import LocalizedField from "./fields/LocalizedField"

const CreateCategoryForm = () => {
  const {
    translations: { categories, forms },
  } = useLocale()
  const { onError } = useErrorHandler()
  const { mutate } = api.categories.create.useMutation({ onError })
  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: fieldDefaultValues,
      description: fieldDefaultValues,
      imageUrl: "",
    },
  })
  const onSubmit: SubmitHandler<CreateCategoryInput> = (values) => {
    mutate(values, {
      onSuccess: () => {
        toast.success(categories.created)
        form.reset()
      },
    })
  }

  return (
    <Form ctx={form} onSubmit={onSubmit} className="space-y-6">
      <LocalizedField control={form.control} name="name" label={forms.name} />
      <LocalizedField
        control={form.control}
        name="description"
        label={forms.description}
      />
      <ImageField control={form.control} />
      <Button type="submit">{forms.create}</Button>
    </Form>
  )
}

export default CreateCategoryForm
