import * as SecureStore from "expo-secure-store"
import { useEffect } from "react"

import { JwtPayload } from "@airneis/types"

import useSessionStore from "@/stores/session"
import config from "@/utils/config"

const useSession = () => {
  const { session, setSession } = useSessionStore()
  const signIn = async (payload: JwtPayload) => {
    await SecureStore.setItemAsync(
      config.session.localStorageKey,
      JSON.stringify(payload),
    )
    setSession(payload)
  }

  useEffect(() => {
    ;(async () => {
      const payload = JSON.stringify(
        await SecureStore.getItemAsync(config.session.localStorageKey),
      )

      if (!payload) {
        return
      }

      setSession(JSON.parse(payload))
    })()
  }, [setSession])

  return { session, signIn }
}

export default useSession
