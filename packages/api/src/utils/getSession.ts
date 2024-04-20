import jsonwebtoken from "jsonwebtoken"
import { cookies } from "next/headers"

import { CookieRawJwt, RawJwt } from "@airneis/types"

import config from "../config"

const getSession = () => {
  const sessionCookie = cookies().get(config.security.jwt.cookie.key)

  if (!sessionCookie) {
    return null
  }

  const { payload: cookieJwtPayload } = jsonwebtoken.decode(
    sessionCookie.value,
  ) as CookieRawJwt
  const { payload } = jsonwebtoken.decode(cookieJwtPayload) as RawJwt

  return payload
}

export default getSession
