import jsonwebtoken from "jsonwebtoken"
import { cookies } from "next/headers"

import { CookieRawJwt, RawJwt } from "@airneis/types"

import config from "../config"
import env from "../env"

const getSession = () => {
  const sessionCookie = cookies().get(config.security.jwt.cookie.key)

  if (!sessionCookie) {
    return null
  }

  try {
    const { payload: cookieJwtPayload } = jsonwebtoken.verify(
      sessionCookie.value,
      env.JWT_SECRET,
    ) as CookieRawJwt
    const { payload } = jsonwebtoken.verify(
      cookieJwtPayload,
      env.JWT_SECRET,
    ) as RawJwt

    return payload
  } catch (err) {
    // If this fails, is means the session is invalid, so we can safely ignore it
    return null
  }
}

export default getSession
