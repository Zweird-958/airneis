import { router } from "expo-router"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { signInSchema } from "@airneis/schemas"

import { Button } from "@/components/ui/Button"
import FormContainer from "@/components/ui/Form/Form"
import { FormField } from "@/components/ui/Form/FormField"
import useLocale from "@/hooks/useLocale"
import useSession from "@/hooks/useSession"
import api from "@/utils/api"

type SignInFormSchema = z.infer<typeof signInSchema>

export const SignInForm: React.FC = () => {
  const { signIn } = useSession()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormSchema>({
    defaultValues: { email: "", password: "" },
  })
  const {
    translations: { common },
  } = useLocale()
  const { mutate } = api.sessions.create.useMutation()
  const onSubmit: SubmitHandler<SignInFormSchema> = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        signIn(data)
        router.replace("/")
      },
    })
  }

  return (
    <FormContainer>
      <FormField
        control={control}
        name="email"
        placeholder={common.email}
        errors={errors.email?.message}
      />
      <FormField
        control={control}
        name="password"
        placeholder={common.password}
        errors={errors.password?.message}
      />
      <Button label="Submit" onPress={handleSubmit(onSubmit)} />
    </FormContainer>
  )
}
