/* eslint-disable capitalized-comments */
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { View } from "react-native"
import { z } from "zod"

import { signInSchema } from "@airneis/schemas"

import { Button } from "@/components/ui/Button"
import { FormField } from "@/components/ui/Form/FormField"
import useLocale from "@/hooks/useLocale"

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
    translations: { common },
  } = useLocale()
  // const { mutate } = api.sessions.create.useMutation()
  const onSubmit: SubmitHandler<SignInFormSchema> = (values) => {
    // mutate(values, {
    //   onSuccess: (data) => {
    //     signIn(data)
    //     router.replace("/")
    //   },
    // })
    // eslint-disable-next-line no-console
    console.log(values)
  }

  return (
    <View>
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
    </View>
  )
}
