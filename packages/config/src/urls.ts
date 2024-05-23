import env from "./env"
import { sharedConfig } from "./shared"

export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return ""
  }

  return env.VERCEL_URL ?? `http://localhost:${env.PORT}`
}

export const getApiUrl = () => `${getBaseUrl()}${sharedConfig.apiPath}`
