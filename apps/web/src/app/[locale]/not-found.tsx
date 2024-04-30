import { useTranslation } from "@/i18n"
import getLocale from "@/utils/locale/getLocale"

const NotFound = async () => {
  const locale = getLocale()
  const { t } = await useTranslation(locale, "common")

  return (
    <div>
      <h1>{t("notFound.title")}</h1>
      <p>{t("notFound.description")}</p>
    </div>
  )
}

export default NotFound
