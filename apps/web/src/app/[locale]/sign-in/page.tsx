import { Metadata } from "next"

import SignInForm from "@/components/forms/SignInForm"
import { useTranslation } from "@/i18n"
import type { PageProps } from "@/types/common"

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
    <div className="h-screen flex items-center justify-center w-full absolute top-0 px-4">
      <div className="max-w-96 mx-auto rounded-default p-4 bg-card w-full">
        <h1 className="text-center text-xl text-primary font-semibold">
          {t("signIn")}
        </h1>
        <SignInForm />
      </div>
    </div>
  )
}

export default SignIn
