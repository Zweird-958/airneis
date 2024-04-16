import CreateMaterialForm from "@/components/forms/CreateMaterialForm"
import { useTranslation } from "@/i18n"
import { PageProps } from "@/types/common"

const PageCreateMaterial = async ({ params: { locale } }: PageProps) => {
  const { t } = await useTranslation(locale, "materials")

  return (
    <div className="mx-4">
      <h1>{t("create")}</h1>
      <CreateMaterialForm />
    </div>
  )
}

export default PageCreateMaterial
