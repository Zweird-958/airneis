import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { NextRequest } from "next/server"

import { appRouter, createTRPCContext } from "@airneis/api"
import { sharedConfig } from "@airneis/config"

import getLocale from "@/utils/locale/getLocale"

const setCorsHeaders = (res: Response) => {
  res.headers.set("Access-Control-Allow-Origin", "*")
  res.headers.set("Access-Control-Request-Method", "*")
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST")
  res.headers.set("Access-Control-Allow-Headers", "*")
}

export const OPTIONS = () => {
  const response = new Response(null, {
    status: 204,
  })
  setCorsHeaders(response)

  return response
}
const handler = async (req: NextRequest) => {
  const locale = getLocale()
  const response = await fetchRequestHandler({
    endpoint: sharedConfig.apiPath,
    router: appRouter,
    req,
    createContext: () => createTRPCContext(req, locale),
  })

  setCorsHeaders(response)

  return response
}

export { handler as GET, handler as POST }
