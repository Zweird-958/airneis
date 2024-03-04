import { Metadata } from "next"

import type { PageProps } from "@airneis/types"

import SignInForm from "@/components/forms/SignInForm"
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
    <div className="h-screen flex items-center justify-center w-full absolute top-0 px-4">
      <div className="max-w-96 mx-auto rounded-default p-4 bg-card w-full">
        <h1 className="text-center text-xl text-primary font-semibold">
          {forms.signIn}
        </h1>
        <SignInForm />
      </div>
    </div>
  )
}

export default SignIn
