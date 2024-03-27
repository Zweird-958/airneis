"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { signInSchema } from "@airneis/schemas"

import EmailField from "@/components/forms/fields/EmailField"
import PasswordField from "@/components/forms/fields/PasswordField"
import Button from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import useErrorHandler from "@/hooks/useErrorHandler"
import useSession from "@/hooks/useSession"
import { useTranslation } from "@/i18n/client"
import api from "@/trpc/client"

type SignInFormSchema = z.infer<typeof signInSchema>

const SignInForm = () => {
  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  })
  const { t } = useTranslation("forms")
  const { onError } = useErrorHandler()
  const { mutate } = api.sessions.create.useMutation()
  const { signIn } = useSession()
  const router = useRouter()
  const onSubmit: SubmitHandler<SignInFormSchema> = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        signIn(data)
        router.push("/")
      },
    })
  }

  return (
    <Form ctx={form} onSubmit={onSubmit} className="space-y-6">
      <EmailField control={form.control} />
      <PasswordField control={form.control} />
      <Button type="submit">{t("signIn")}</Button>
    </Form>
  )
}

export default SignInForm
