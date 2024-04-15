import * as SecureStore from "expo-secure-store"
import { JwtPayload } from "packages/types"
import { useEffect } from "react"

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
    const payload = JSON.stringify(
      SecureStore.getItemAsync(config.session.localStorageKey),
    )

    if (!payload) {
      return
    }

    setSession(JSON.parse(payload))
  }, [setSession])

  return { session, signIn }
}

export default useSession
