import SignUpForm from "@/components/forms/SignUpForm"
import { FormLayout } from "@/components/ui/Form/FormLayout"
import { PageProps } from "@/types/common"
import getTranslations from "@/utils/locale/getTranslations"

const SignUp = async ({ params: { locale } }: PageProps) => {
  const { forms } = await getTranslations(locale)

  return (
    <FormLayout labelForm={forms.signUp}>
      <SignUpForm />
    </FormLayout>
  )
}

export default SignUp
