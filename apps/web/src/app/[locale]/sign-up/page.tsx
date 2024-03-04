import { PageProps } from "packages/types"

import SignUpForm from "@/components/forms/SignUpForms"
import getTranslations from "@/utils/locale/getTranslations"

const SignUp = async ({ params: { locale } }: PageProps) => {
  const { forms } = await getTranslations(locale)

  return (
    <div className="h-screen flex items-center justify-center w-full absolute top-0">
      <div className="max-w-96 mx-auto rounded-default p-4 bg-card w-full">
        <h1 className="text-center text-xl text-primary font-semibold">
          {forms.signUp}
        </h1>
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignUp
