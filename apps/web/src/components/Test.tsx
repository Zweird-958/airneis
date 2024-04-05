"use client"

import { useTranslation } from "@/i18n/client"

const Test = () => {
  const { t } = useTranslation("zodErrors")

  return (
    <div>
      <h1>{t("hello", { name: "test" })}</h1>
      <h1>{t("zodErrors:username.length")}</h1>
    </div>
  )
}

export default Test
