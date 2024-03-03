import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/react-query"
import { ReactNode, useState } from "react"
import superjson from "superjson"

import env from "@/env"
import api from "@/utils/api"

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
          url: `${env.EXPO_PUBLIC_HOST_SERVER_URL}/api/trpc`,
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
