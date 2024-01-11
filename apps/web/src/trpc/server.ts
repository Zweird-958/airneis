// Import "server-only"

// import { createCaller, createTRPCContext } from "@airneis/api"
// import { cache } from "react"

// const createContext = cache(() => createTRPCContext())
// const api = createCaller(createContext())

// export default api

import "server-only"

import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"

import { AppRouter } from "packages/api/src"
import SuperJSON from "superjson"

const api = createTRPCProxyClient<AppRouter>({
  transformer: SuperJSON,
  links: [
    httpBatchLink({
      url: "http://localhost:3002",
      // You can pass any HTTP headers you wish here
    }),
  ],
})

export default api
