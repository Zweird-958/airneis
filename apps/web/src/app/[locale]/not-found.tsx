import { headers } from "next/headers"

import { sharedConfig } from "@airneis/config"
import { localeFallbackSchema } from "@airneis/schemas"

import { useTranslation } from "@/i18n"

const NotFound = async () => {
  /**
   * Next.js doesn't provide custom params (e.g. `locale`) in not-found pages.
   * Becaues of that, we we need to get creative.
   *
   * Here we use the pathname header to get the current locale.
   */
  const pathname = headers().get(sharedConfig.pathnameHeaderKey)
  const lang = localeFallbackSchema.parse(pathname?.split("/")[1])
  const { t } = await useTranslation(lang, "common")

  return (
    <div>
      <h1>{t("notFound.title")}</h1>
      <p>{t("notFound.description")}</p>
    </div>
  )
}

export default NotFound
