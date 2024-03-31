"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEventHandler, useState } from "react"
import { useForm } from "react-hook-form"

import {
  CreateCategoryInput,
  createCategorySchemaWithoutImage,
} from "@airneis/schemas"

import Button from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import useCreateCategory from "@/hooks/useCreateCategory"
import { useTranslation } from "@/i18n/client"
import fieldDefaultValues from "@/utils/locale/fieldDefaultValues"

import ImageField from "./fields/ImageField"
import LocalizedField from "./fields/LocalizedField"

const CreateCategoryForm = () => {
  const { t } = useTranslation("forms")
  const [image, setImage] = useState<File | null>(null)
  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchemaWithoutImage),
    defaultValues: {
      name: fieldDefaultValues,
      description: fieldDefaultValues,
    },
  })
  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files

    if (file?.item(0)) {
      setImage(file.item(0))
    }
  }
  const { onSubmit } = useCreateCategory({ image })

  return (
    <Form ctx={form} onSubmit={onSubmit} className="space-y-6">
      <LocalizedField control={form.control} name="name" label={t("name")} />
      <LocalizedField
        control={form.control}
        name="description"
        label={t("description")}
      />
      <ImageField handleOnChange={handleFileUpload} fileName={image?.name} />
      <Button type="submit">{t("create")}</Button>
    </Form>
  )
}

export default CreateCategoryForm
