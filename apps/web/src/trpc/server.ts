import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { headers } from "next/headers"
import "server-only"
import superjson from "superjson"

import { AppRouter } from "@airneis/api"

import { getUrl } from "@/trpc/shared"

const api = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: getUrl(),
      headers() {
        const newHeaders = new Map(headers())

        return Object.fromEntries(newHeaders)
      },
    }),
  ],
})

export default api
