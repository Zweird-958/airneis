"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { TRPCClientError } from "@trpc/client"
import axios from "axios"
import { ChangeEventHandler, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import {
  CreateCategoryInput,
  createCategorySchemaWithoutImage,
} from "@airneis/schemas"

import Button from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import { useTranslation } from "@/i18n/client"
import api from "@/trpc/client"
import { ImageResponse } from "@/types/api"
import fieldDefaultValues from "@/utils/locale/fieldDefaultValues"

import ImageField from "./fields/ImageField"
import LocalizedField from "./fields/LocalizedField"

/* eslint-disable no-alert -- Will be replaced with toasts in the future */
// eslint-disable-next-line max-lines-per-function
const CreateCategoryForm = () => {
  const { t } = useTranslation("forms", "categories")
  const [image, setImage] = useState<File | null>(null)
  const { mutateAsync: uploadImage } = useMutation({
    mutationKey: ["image"],
    mutationFn: async (formData: FormData) =>
      await axios.post<ImageResponse>("/api/image", formData),
  })
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
    resolver: zodResolver(createCategorySchemaWithoutImage),
    defaultValues: {
      name: fieldDefaultValues,
      description: fieldDefaultValues,
    },
  })
  const createFormData = () => {
    const formData = new FormData()

    if (image) {
      formData.append("file", image)
    }

    return formData
  }
  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files

    if (file?.item(0)) {
      setImage(file.item(0))
    }
  }
  const onSubmit: SubmitHandler<CreateCategoryInput> = async (values) => {
    try {
      if (!image) {
        alert(t("categories:errors.imageRequired"))

        return
      }

      const {
        data: { result: imageUrl },
      } = await uploadImage(createFormData())

      await mutateAsync({ ...values, imageUrl })
    } catch (error) {
      if (!(error instanceof TRPCClientError)) {
        alert(t("categories:errors.image"))
      }
    }
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
      <ImageField handleOnChange={handleFileUpload} />
      <Button type="submit">{t("forms:create")}</Button>
    </Form>
  )
}

export default CreateCategoryForm
