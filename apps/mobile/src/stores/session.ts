import { create } from "zustand"

import { JwtPayload } from "@airneis/types"

type SessionStore = {
  session: JwtPayload | null
  setSession: (session: JwtPayload) => void
}

const useSessionStore = create<SessionStore>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}))

export default useSessionStore
