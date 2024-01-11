"use client"

import { api } from "@/trpc/client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/react-query"
import { ReactNode, useState } from "react"
import superjson from "superjson"

type Props = {
  children: ReactNode
}

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return ""
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return `http://localhost:${process.env.PORT ?? 3000}`
}
const TRPCProvider = (props: Props) => {
  const { children } = props
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    }),
  )

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  )
}
const Providers = (props: Props) => {
  const { children } = props

  return <TRPCProvider>{children}</TRPCProvider>
}

export default Providers
