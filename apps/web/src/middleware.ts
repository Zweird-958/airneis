import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { NextRequest, NextResponse } from "next/server"

import { sharedConfig } from "@airneis/config"
import { localeSchema } from "@airneis/schemas"
import type { Locale } from "@airneis/types"

import webConfig from "@/utils/config"

const getLocale = ({ headers, cookies }: NextRequest) =>
  localeSchema
    .catch(() => {
      const languages = new Negotiator({
        headers: { "accept-language": headers.get("Accept-Language") ?? "" },
      }).languages()

      return match(
        languages,
        sharedConfig.languageKeys,
        sharedConfig.fallbackLng,
      ) as Locale
    })
    .parse(cookies.get(webConfig.locale.cookieKey)?.value)

export const middleware = (request: NextRequest) => {
  const {
    nextUrl: { pathname },
    url,
  } = request

  if (
    !sharedConfig.languageKeys.some((loc) => pathname.startsWith(`/${loc}`))
  ) {
    return NextResponse.redirect(
      new URL(`/${getLocale(request)}${pathname}`, url),
    )
  }

  const lngInReferer = sharedConfig.languageKeys.find((l) =>
    pathname.startsWith(`/${l}`),
  )
  const response = NextResponse.next()

  if (lngInReferer) {
    response.cookies.set(webConfig.locale.cookieKey, lngInReferer)
  }

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|logo).*)",
  ],
}
