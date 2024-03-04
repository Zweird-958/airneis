import jsonwebtoken from "jsonwebtoken"
import { useEffect } from "react"

import type { RawJwt } from "@airneis/types"

import useSessionStore from "@/stores/session"
import config from "@/utils/config"

const useSession = () => {
  const { session, setSession } = useSessionStore()
  const signIn = (jwt: string) => {
    localStorage.setItem(config.session.localStorageKey, jwt)

    const { payload } = jsonwebtoken.decode(jwt) as RawJwt

    setSession(payload)
  }

  useEffect(() => {
    const jwt = localStorage.getItem(config.session.localStorageKey)

    if (!jwt) {
      return
    }

    const { payload } = jsonwebtoken.decode(jwt) as RawJwt
    setSession(payload)
  }, [setSession])

  return { session, signIn }
}

export default useSession
