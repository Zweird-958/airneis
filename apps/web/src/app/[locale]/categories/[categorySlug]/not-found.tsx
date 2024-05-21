import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Link from "@/components/ui/Link"
import { useTranslation } from "@/i18n"
import getLocale from "@/utils/locale/getLocale"

const NotFoundPage = async () => {
  const locale = getLocale()
  const { t } = await useTranslation(locale, "categories")

  return (
    <div className="flex justify-center mt-8">
      <Card className="flex flex-col gap-4 items-center">
        <h1>{t("notFound.title")}</h1>
        <h2>{t("notFound.description")}</h2>
        <Button asChild className="w-fit">
          <Link href="/">{t("notFound.back")}</Link>
        </Button>
      </Card>
    </div>
  )
}
export default NotFoundPage
