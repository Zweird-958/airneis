import { sharedConfig } from "@airneis/config"

import env from "@/env"

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return ""
  }

  if (env.VERCEL_URL) {
    return `https://${env.VERCEL_URL}`
  }

  return `http://localhost:${env.PORT}`
}
export const getUrl = () => `${getBaseUrl()}${sharedConfig.apiEndpoint}`
