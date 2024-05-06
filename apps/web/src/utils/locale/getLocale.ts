import { cookies, headers } from "next/headers"

import { sharedConfig } from "@airneis/config"
import { localeFallbackSchema, localeSchema } from "@airneis/schemas"

const getLocale = () => {
  const setCookie = headers().get("Set-Cookie")
  const langSetCookie = setCookie
    ?.split(`${sharedConfig.localeCookieKey}=`)[1]
    ?.split(";")[0]
  const langCookie = cookies().get(sharedConfig.localeCookieKey)?.value

  return localeSchema
    .catch(localeFallbackSchema.parse(langCookie))
    .parse(langSetCookie)
}

export default getLocale
