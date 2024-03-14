import JWT from "expo-jwt"
import * as SecureStore from "expo-secure-store"
import { useEffect } from "react"

import type { RawJwt } from "@airneis/types"

import env from "@/env"
import useSessionStore from "@/stores/session"
import config from "@/utils/config"

const useSession = () => {
  const { session, setSession } = useSessionStore()
  const signIn = async (jwt: string) => {
    await SecureStore.setItemAsync(config.session.localStorageKey, jwt)

    const { payload } = JWT.decode(jwt, env.JWT_SECRET) as RawJwt

    setSession(payload)
  }

  useEffect(() => {
    const fetchSession = async () => {
      const jwt = await SecureStore.getItemAsync(config.session.localStorageKey)

      if (!jwt) {
        return
      }

      const { payload } = JWT.decode(jwt, env.JWT_SECRET) as RawJwt
      setSession(payload)
    }

    fetchSession()
  }, [setSession])

  return { session, signIn }
}

export default useSession
