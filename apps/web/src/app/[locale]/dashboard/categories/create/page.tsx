import CreateCategoryForm from "@/components/forms/CreateCategoryForm"
import { PageProps } from "@/types/common"
import getTranslations from "@/utils/locale/getTranslations"

const Page = async ({ params: { locale } }: PageProps) => {
  const { categories } = await getTranslations(locale)

  return (
    <div className="mx-4">
      <h1>{categories.create}</h1>
      <CreateCategoryForm />
    </div>
  )
}

export default Page
