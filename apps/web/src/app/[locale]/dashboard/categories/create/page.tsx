import CreateCategoryForm from "@/components/forms/CreateCategoryForm"
import { useTranslation } from "@/i18n"
import { PageProps } from "@/types/common"

const Page = async ({ params: { locale } }: PageProps) => {
  const { t } = await useTranslation(locale, "categories")

  return (
    <div className="mx-4">
      <h1>{t("create")}</h1>
      <CreateCategoryForm />
    </div>
  )
}

export default Page
