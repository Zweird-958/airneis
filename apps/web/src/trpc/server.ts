import "server-only"

import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"

import { AppRouter } from "@airneis/api"
import SuperJSON from "superjson"
import getUrl from "@/trpc/shared"

const api = createTRPCProxyClient<AppRouter>({
  transformer: SuperJSON,
  links: [
    httpBatchLink({
      url: getUrl(),
    }),
  ],
})

export default api
