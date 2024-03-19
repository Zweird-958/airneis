import * as SecureStore from "expo-secure-store"
import { useEffect } from "react"

import useSessionStore from "@/stores/session"
import config from "@/utils/config"

const useSession = () => {
  const { session, setSession } = useSessionStore()
  const signIn = async (jwt: string) => {
    await SecureStore.setItemAsync(config.session.localStorageKey, jwt)

    setSession(jwt)
  }

  useEffect(() => {
    const getSession = async () => {
      const jwt = await SecureStore.getItemAsync(config.session.localStorageKey)

      if (jwt) {
        setSession(jwt)
      }
    }

    getSession()
  })

  return { session, signIn }
}

export default useSession
