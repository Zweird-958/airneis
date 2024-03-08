import React from "react"
import { useForm } from "react-hook-form"
import 

import { Button } from "@/components/ui/Button"
import api from "@/trpc/client"

const MyForm: React.FC = () => {
  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  })
  const {
    translations: { forms },
  } = useLocale()
  const router = useRouter()
  const { mutate } = api.sessions.create.useMutation()
  const onSubmit: SubmitHandler<SignInFormSchema> = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        signIn(data)
        router.push("/")
      },
    })
  }
  return (
    <FormContainer>
      <InputField name="username" placeholder="Username" />
      <InputField name="password" placeholder="Password" />
      <Button label="Submit" />
    </FormContainer>
  )
}

export default MyForm
