import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { NextRequest } from "next/server"

import { appRouter, createTRPCContext } from "@airneis/api"
import { sharedConfig } from "@airneis/config"
import { localeFallbackSchema } from "@airneis/schemas"

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
  const langCookie = req.cookies.get(sharedConfig.localeCookieKey)?.value
  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: () =>
      createTRPCContext(localeFallbackSchema.parse(langCookie)),
  })

  setCorsHeaders(response)

  return response
}

export { handler as GET, handler as POST }
