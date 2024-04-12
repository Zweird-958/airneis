"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { CreateMaterialInput, createMaterialSchema } from "@airneis/schemas"

import LocalizedField from "@/components/forms/fields/LocalizedField"
import Button from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import useErrorHandler from "@/hooks/useErrorHandler"
import { useTranslation } from "@/i18n/client"
import api from "@/trpc/client"
import fieldDefaultValues from "@/utils/locale/fieldDefaultValues"

const CreateMaterialForm = () => {
  const { t } = useTranslation("materials", "forms")
  const { onError } = useErrorHandler()
  const form = useForm<CreateMaterialInput>({
    resolver: zodResolver(createMaterialSchema),
    defaultValues: {
      name: fieldDefaultValues,
    },
  })
  const { mutate } = api.materials.create.useMutation({
    onError,
    onSuccess: () => {
      toast.success(t("materials:created"))
      form.reset()
    },
  })
  const onSubmit: SubmitHandler<CreateMaterialInput> = (values) => {
    mutate(values)
  }

  return (
    <Form ctx={form} onSubmit={onSubmit} className="space-y-6">
      <LocalizedField
        control={form.control}
        name="name"
        label={t("forms:name")}
      />
      <Button type="submit">{t("forms:create")}</Button>
    </Form>
  )
}

export default CreateMaterialForm
