import { useMutation } from "@tanstack/react-query"
import { TRPCClientError } from "@trpc/react-query"
import axios from "axios"
import { useState } from "react"
import { SubmitHandler } from "react-hook-form"

import { CreateCategoryInput } from "@airneis/schemas"

import { useTranslation } from "@/i18n/client"
import api from "@/trpc/client"
import { ImageResponse } from "@/types/api"

type Props = {
  image: File | null
}

/* eslint-disable no-alert */
const useCreateCategory = ({ image }: Props) => {
  const { t } = useTranslation("categories")
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const { mutateAsync: deleteImage } = api.images.delete.useMutation()
  const { mutateAsync: createCategory } = api.categories.create.useMutation({
    onSuccess: () => {
      alert(t("created"))
    },
    onError: async (error) => {
      if (error instanceof TRPCClientError) {
        alert(error.message)

        if (imageUrl) {
          await deleteImage(imageUrl)
        }

        return
      }

      alert(t("errors.create"))
    },
  })
  const { mutateAsync: uploadImage } = useMutation({
    mutationKey: ["image"],
    mutationFn: async (formData: FormData) =>
      await axios.post<ImageResponse>("/api/image", formData),
    onError: () => {
      alert(t("errors.image"))
    },
  })
  const onSubmit: SubmitHandler<CreateCategoryInput> = async (values) => {
    if (!image) {
      alert(t("errors.imageRequired"))

      return
    }

    const formData = new FormData()
    formData.append("file", image)
    const {
      data: { result },
    } = await uploadImage(formData)
    setImageUrl(result)

    await createCategory({ ...values, imageUrl: result })
  }

  return { onSubmit }
}

export default useCreateCategory
