"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { SignUpInput, signUpSchema } from "@airneis/schemas"

import EmailField from "@/components/forms/fields/EmailField"
import FirstNameField from "@/components/forms/fields/FirstNameField"
import LastNameField from "@/components/forms/fields/LastNameField"
import PasswordField from "@/components/forms/fields/PasswordField"
import Button from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import useErrorHandler from "@/hooks/useErrorHandler"
import { useTranslation } from "@/i18n/client"
import api from "@/trpc/client"

const SignUpForm = () => {
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  })
  const { t } = useTranslation("forms")
  const { onError } = useErrorHandler()
  const { mutate } = api.users.create.useMutation({
    onError,
    onSuccess: () => {
      toast.success(t("signUp.success"), { duration: 5000 })
    },
  })
  const onSubmit: SubmitHandler<SignUpInput> = (values) => {
    mutate(values)
  }

  return (
    <Form ctx={form} onSubmit={onSubmit} className="space-y-6">
      <FirstNameField control={form.control} />
      <LastNameField control={form.control} />
      <EmailField control={form.control} />
      <PasswordField control={form.control} />
      <Button type="submit">{t("signUp.title")}</Button>
    </Form>
  )
}

export default SignUpForm
