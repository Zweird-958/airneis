import SignUpForm from "@/components/forms/SignUpForm"
import { FormLayout } from "@/components/ui/Form/FormLayout"
import { useTranslation } from "@/i18n"
import { PageProps } from "@/types/common"

const SignUp = async ({ params: { locale } }: PageProps) => {
  const { t } = await useTranslation(locale, "forms")

  return (
    <FormLayout labelForm={t("signUp")}>
      <SignUpForm />
    </FormLayout>
  )
}

export default SignUp
