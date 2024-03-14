import { SignInForm } from "@/components/forms/SignInForm"
import FormContainer from "@/components/ui/Form/FormContainer"
import useLocale from "@/hooks/useLocale"

export const SignIn = () => {
  const {
    translations: { common },
  } = useLocale()

  return (
    <FormContainer title={common.signIn}>
      <SignInForm />
    </FormContainer>
  )
}
