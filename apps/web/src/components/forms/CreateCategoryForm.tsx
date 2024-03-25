"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { TRPCClientError } from "@trpc/client"
import { SubmitHandler, useForm } from "react-hook-form"

import { CreateCategoryInput, createCategorySchema } from "@airneis/schemas"

import Button from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import { useTranslation } from "@/i18n/client"
import api from "@/trpc/client"
import fieldDefaultValues from "@/utils/locale/fieldDefaultValues"

import ImageField from "./fields/ImageField"
import LocalizedField from "./fields/LocalizedField"

/* eslint-disable no-alert -- Will be replaced with toasts in the future */
const CreateCategoryForm = () => {
  const { t } = useTranslation("categories", "forms")
  const { mutateAsync } = api.categories.create.useMutation({
    onSuccess: () => {
      alert("Category created")
    },
    onError: (error) => {
      if (error instanceof TRPCClientError) {
        alert(error.message)

        return
      }

      alert(t("categories:errors.create"))
    },
  })
  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: fieldDefaultValues,
      description: fieldDefaultValues,
      imageUrl: "",
    },
  })
  const onSubmit: SubmitHandler<CreateCategoryInput> = async (values) => {
    await mutateAsync(values)
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
