import jsonwebtoken from "jsonwebtoken"
import { useCallback, useEffect } from "react"

import type { RawJwt } from "@airneis/types"

import useSessionStore from "@/stores/session"
import api from "@/trpc/client"
import config from "@/utils/config"

const useSession = () => {
  const { session, setSession } = useSessionStore()
  const { mutateAsync } = api.sessions.delete.useMutation()
  const { mutate: cartMutate } = api.carts.saveLocale.useMutation({
    onSettled: () => localStorage.removeItem(config.cart.localStorageKey),
  })
  const signIn = (jwt: string) => {
    localStorage.setItem(config.session.localStorageKey, jwt)

    const { payload } = jsonwebtoken.decode(jwt) as RawJwt
    setSession(payload)

    const localeCart = localStorage.getItem(config.cart.localStorageKey)

    if (!localeCart) {
      return
    }

    cartMutate(JSON.parse(localeCart))
  }
  const signOut = useCallback(async () => {
    await mutateAsync()
    localStorage.removeItem(config.session.localStorageKey)

    setSession(null)
  }, [mutateAsync, setSession])

  useEffect(() => {
    const jwt = localStorage.getItem(config.session.localStorageKey)

    if (!jwt) {
      return
    }

    const { payload } = jsonwebtoken.decode(jwt) as RawJwt
    setSession(payload)
  }, [setSession])

  return { session, signIn, signOut }
}

export default useSession
