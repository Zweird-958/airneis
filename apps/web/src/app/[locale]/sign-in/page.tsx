import { Metadata } from "next"

import SignInForm from "@/components/forms/SignInForm"
import { FormLayout } from "@/components/ui/Form/FormLayout"
import { PageProps } from "@/types/common"
import getTranslations from "@/utils/locale/getTranslations"

export const generateMetadata = async ({
  params: { locale },
}: PageProps): Promise<Metadata> => {
  const {
    common: { signIn },
  } = await getTranslations(locale)

  return {
    title: signIn.title,
    description: signIn.description,
  }
}
const SignIn = async ({ params: { locale } }: PageProps) => {
  const { forms } = await getTranslations(locale)

  return (
    <FormLayout labelForm={forms.signIn}>
      <SignInForm />
    </FormLayout>
  )
}

export default SignIn
