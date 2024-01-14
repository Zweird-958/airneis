import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import "server-only"
import superjson from "superjson"

import { AppRouter } from "@airneis/api"

import { getUrl } from "@/trpc/shared"

const api = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: getUrl(),
    }),
  ],
})

export default api
