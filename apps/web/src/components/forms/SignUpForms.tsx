"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

import { SignUpInput, signUpSchema } from "@airneis/schemas"

import EmailField from "@/components/forms/fields/EmailField"
import FirstNameField from "@/components/forms/fields/FirstNameField"
import LastNameField from "@/components/forms/fields/LastNameField"
import PasswordField from "@/components/forms/fields/PasswordField"
import Button from "@/components/ui/Button"
import { Form } from "@/components/ui/Form"
import useLocale from "@/hooks/useLocale"
import api from "@/trpc/client"

const SignUpForm = () => {
  const router = useRouter()
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  })
  const {
    translations: { forms },
  } = useLocale()
  const { mutate } = api.users.create.useMutation()
  const onSubmit: SubmitHandler<SignUpInput> = (values) => {
    mutate(values, {
      onSuccess: () => {
        router.push("/sign-in")
      },
    })
  }

  return (
    <Form ctx={form} onSubmit={onSubmit} className="space-y-6">
      <FirstNameField control={form.control} />
      <LastNameField control={form.control} />
      <EmailField control={form.control} />
      <PasswordField control={form.control} />
      <Button type="submit">{forms.signUp}</Button>
    </Form>
  )
}

export default SignUpForm
