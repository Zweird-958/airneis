"use client"

import api from "@/trpc/client"
import getUrl from "@/trpc/shared"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/react-query"
import { ReactNode, useState } from "react"
import superjson from "superjson"

type Props = {
  children: ReactNode
}

const TRPCProvider = (props: Props) => {
  const { children } = props
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: getUrl(),
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
