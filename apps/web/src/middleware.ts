import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { NextRequest, NextResponse } from "next/server"

import getSession from "@airneis/api/getSession"
import { sharedConfig } from "@airneis/config"
import { localeSchema } from "@airneis/schemas"
import type { Locale } from "@airneis/types"

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
    .parse(cookies.get(sharedConfig.localeCookieKey)?.value)

export const middleware = (request: NextRequest) => {
  const {
    nextUrl: { pathname },
    url,
  } = request

  /**
   * Language detection and redirection
   */
  if (
    !sharedConfig.languageKeys.some((lang) => pathname.startsWith(`/${lang}`))
  ) {
    return NextResponse.redirect(
      new URL(`/${getLocale(request)}${pathname}`, url),
    )
  }

  const langInReferer = sharedConfig.languageKeys.find((lang) =>
    pathname.startsWith(`/${lang}`),
  )
  const response = NextResponse.next()
  const cookie = request.cookies.get(sharedConfig.localeCookieKey)

  if (langInReferer && cookie?.value !== langInReferer) {
    response.cookies.set(sharedConfig.localeCookieKey, langInReferer)
  }

  /**
   * Session handling and route protection
   */
  const session = getSession()

  if (
    /\/\w{2}\/dashboard.*/u.exec(pathname)?.length &&
    session?.user.role !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/404", url))
  }

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|logo).*)",
  ],
}
