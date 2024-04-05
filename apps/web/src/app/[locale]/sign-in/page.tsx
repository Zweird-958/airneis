import { Metadata } from "next"

import SignInForm from "@/components/forms/SignInForm"
import { FormLayout } from "@/components/ui/Form/FormLayout"
import { useTranslation } from "@/i18n"
import { PageProps } from "@/types/common"

export const generateMetadata = async ({
  params: { locale },
}: PageProps): Promise<Metadata> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale)

  return {
    title: t("signIn.title"),
    description: t("signIn.title"),
  }
}
const SignIn = async ({ params: { locale } }: PageProps) => {
  const { t } = await useTranslation(locale, "forms")

  return (
    <FormLayout labelForm={t("signIn")}>
      <SignInForm />
    </FormLayout>
  )
}

export default SignIn
