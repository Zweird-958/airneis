"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { CreateMessageInput, createMessageSchema } from "@airneis/schemas"

import DescriptionField from "@/components/forms/fields/DescriptionField"
import EmailField from "@/components/forms/fields/EmailField"
import SubjectField from "@/components/forms/fields/SubjectField"
import Button from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import useErrorHandler from "@/hooks/useErrorHandler"
import { useTranslation } from "@/i18n/client"
import api from "@/trpc/client"

const ContactForm = () => {
  const form = useForm<CreateMessageInput>({
    resolver: zodResolver(createMessageSchema),
    defaultValues: {
      email: "",
      subject: "",
      description: "",
    },
  })
  const { t } = useTranslation("forms")
  const { onError } = useErrorHandler()
  const { mutate } = api.contact.create.useMutation({
    onError,
    onSuccess: () => {
      toast.success(t("contact.success"), { duration: 5000 })
      form.reset()
    },
  })
  const onSubmit: SubmitHandler<CreateMessageInput> = (values) => {
    mutate(values)
  }

  return (
    <Form ctx={form} onSubmit={onSubmit} className="space-y-6">
      <EmailField control={form.control} />
      <SubjectField control={form.control} />
      <DescriptionField control={form.control} />
      <Button type="submit">{t("send")}</Button>
    </Form>
  )
}

export default ContactForm
