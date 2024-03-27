"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { CreateCategoryInput, createCategorySchema } from "@airneis/schemas"

import Button from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import useErrorHandler from "@/hooks/useErrorHandler"
import { useTranslation } from "@/i18n/client"
import api from "@/trpc/client"
import fieldDefaultValues from "@/utils/locale/fieldDefaultValues"

import ImageField from "./fields/ImageField"
import LocalizedField from "./fields/LocalizedField"

const CreateCategoryForm = () => {
  const { t } = useTranslation("categories", "forms")
  const { onError } = useErrorHandler()
  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: fieldDefaultValues,
      description: fieldDefaultValues,
      imageUrl: "",
    },
  })
  const { mutate } = api.categories.create.useMutation({
    onError,
    onSuccess: () => {
      toast.success(t("categories:created"))
      form.reset()
    },
  })
  const onSubmit: SubmitHandler<CreateCategoryInput> = (values) => {
    mutate(values)
  }

  return (
    <Form ctx={form} onSubmit={onSubmit} className="space-y-6">
      <LocalizedField
        control={form.control}
        name="name"
        label={t("forms:name")}
      />
      <LocalizedField
        control={form.control}
        name="description"
        label={t("forms:description")}
      />
      <ImageField control={form.control} />
      <Button type="submit">{t("forms:create")}</Button>
    </Form>
  )
}

export default CreateCategoryForm
