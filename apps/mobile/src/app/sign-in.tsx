import { SignInForm } from "@/components/forms/SignInForm"
import FormContainer from "@/components/ui/Form/FormContainer"
import useLocale from "@/hooks/useLocale"

const SignIn = () => {
  const {
    translations: { forms },
  } = useLocale()

  return (
    <FormContainer title={forms.signIn}>
      <SignInForm />
    </FormContainer>
  )
}

export default SignIn
