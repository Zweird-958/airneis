import * as SecureStore from "expo-secure-store"
import jsonwebtoken from "jsonwebtoken"
import { useEffect } from "react"

import type { RawJwt } from "@airneis/types"

import useSessionStore from "@/stores/session"
import config from "@/utils/config"

const useSession = () => {
  const { session, setSession } = useSessionStore()
  const signIn = async (jwt: string) => {
    await SecureStore.setItemAsync(config.session.localStorageKey, jwt)

    const { payload } = jsonwebtoken.decode(jwt) as RawJwt

    setSession(payload)
  }

  useEffect(() => {
    const fetchSession = async () => {
      const jwt = await SecureStore.getItemAsync(config.session.localStorageKey)

      if (!jwt) {
        return
      }

      const { payload } = jsonwebtoken.decode(jwt) as RawJwt
      setSession(payload)
    }

    fetchSession()
  }, [setSession])

  return { session, signIn }
}

export default useSession
