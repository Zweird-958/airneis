import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { headers } from "next/headers"
import "server-only"
import superjson from "superjson"

import { AppRouter } from "@airneis/api"
import { getApiUrl, sharedConfig } from "@airneis/config"

const api = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: getApiUrl(),
      headers: () => ({
        ...Object.fromEntries(new Map(headers())),
        [sharedConfig.api.source.key]: sharedConfig.api.source.webServer,
      }),
    }),
  ],
})

export default api
