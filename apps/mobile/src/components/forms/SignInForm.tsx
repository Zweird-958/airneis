import { router } from "expo-router"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { View } from "react-native"
import { z } from "zod"

import { signInSchema } from "@airneis/schemas"

import Button from "@/components/ui/Button"
import FormField from "@/components/ui/Form/FormField"
import useLocale from "@/hooks/useLocale"
import useSession from "@/hooks/useSession"
import api from "@/utils/api"

type SignInFormSchema = z.infer<typeof signInSchema>

export const SignInForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormSchema>({
    defaultValues: { email: "", password: "" },
  })
  const {
    translations: { forms },
  } = useLocale()
  const { signIn } = useSession()
  const { mutate } = api.sessions.create.useMutation()
  const onSubmit: SubmitHandler<SignInFormSchema> = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        signIn(data.payload)
        router.replace("/")
      },
    })
  }

  return (
    <View>
      <FormField
        control={control}
        name="email"
        placeholder={forms.email}
        errors={errors.email?.message}
        type="email"
        secureTextEntry={false}
      />
      <FormField
        control={control}
        name="password"
        placeholder={forms.password}
        errors={errors.password?.message}
        type="text"
        secureTextEntry={true}
      />
      <Button label="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}
