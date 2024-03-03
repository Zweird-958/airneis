"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"

import {
  CreateCategoryInput,
  createCategorySchema,
  localizedFieldDefaultValues,
} from "@airneis/schemas"

import Button from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import useLocale from "@/hooks/useLocale"
import api from "@/trpc/client"

import ImageField from "./fields/ImageField"
import LocalizedField from "./fields/LocalizedField"

const CreateCategoryForm = () => {
  const {
    translations: { forms },
  } = useLocale()
  const { mutateAsync } = api.categories.create.useMutation({
    onSuccess: () => {
      // eslint-disable-next-line no-alert -- Will be replaced with a toast in the future
      alert("Category created")
    },
    onError: () => {
      // eslint-disable-next-line no-alert -- Will be replaced with a toast in the future
      alert("Error creating category")
    },
  })
  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: localizedFieldDefaultValues,
      description: localizedFieldDefaultValues,
      imageUrl: "",
    },
  })
  const onSubmit: SubmitHandler<CreateCategoryInput> = async (values) => {
    await mutateAsync(values)
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
      <Button>Create</Button>
    </Form>
  )
}

export default CreateCategoryForm
