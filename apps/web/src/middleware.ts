import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { NextRequest, NextResponse } from "next/server"

import { sharedConfig } from "@airneis/config"

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = sharedConfig.languageKeys.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) {
    return null
  }

  const { headers, url } = request
  const languages = new Negotiator({
    headers: { "accept-language": headers.get("Accept-Language") ?? "" },
  }).languages()
  const locale = match(
    languages,
    sharedConfig.languageKeys,
    sharedConfig.fallbackLng,
  )

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, url))
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
}
