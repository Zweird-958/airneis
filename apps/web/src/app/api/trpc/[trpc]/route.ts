import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { NextRequest } from "next/server"

import { appRouter, createTRPCContext } from "@airneis/api"
import { sharedConfig } from "@airneis/config"
import { localeFallbackSchema, localeSchema } from "@airneis/schemas"

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
  const setCookie = req.headers.get("Set-Cookie")
  const langSetCookie = setCookie
    ?.split(`${sharedConfig.localeCookieKey}=`)[1]
    ?.split(";")[0]
  const langCookie = req.cookies.get(sharedConfig.localeCookieKey)?.value
  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: () =>
      createTRPCContext(
        req,
        localeSchema
          .catch(localeFallbackSchema.parse(langCookie))
          .parse(langSetCookie),
      ),
  })

  setCorsHeaders(response)

  return response
}

export { handler as GET, handler as POST }
