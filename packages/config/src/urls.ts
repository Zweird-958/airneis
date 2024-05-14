import { sharedConfig } from "@airneis/config"

import env from "./env"

export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return ""
  }

  return env.VERCEL_URL ?? `http://localhost:${env.PORT}`
}

export const getApiUrl = () => `${getBaseUrl()}${sharedConfig.api.path}`
