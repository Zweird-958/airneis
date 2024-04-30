import { cookies } from "next/headers"

import { Locale, sharedConfig } from "@airneis/config"

import { useTranslation } from "@/i18n"

const NotFound = async () => {
  /**
   * Next.js doesn't provide custom params (e.g. `locale`) in not-found pages.
   * Becaues of that, we we need to get creative.
   *
   * Here we use the lang cookie set by the middleware, it should never be empty.
   */
  const { value: lang } = cookies().get(sharedConfig.localeCookieKey)!
  const { t } = await useTranslation(lang as Locale, "common")

  return (
    <div>
      <h1>{t("notFound.title")}</h1>
      <p>{t("notFound.description")}</p>
    </div>
  )
}

export default NotFound
