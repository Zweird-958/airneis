import Constants from "expo-constants"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import superjson from "superjson"
import { httpBatchLink } from "@trpc/react-query"
import api from "@/utils/api"

type Props = {
  children: ReactNode
}

const getBaseUrl = () => {
  const debuggerHost = Constants.expoConfig?.hostUri
  const localhost = debuggerHost?.split(":")[0]

  if (!localhost) {
    throw new Error(
      "Failed to get localhost. Please point to your production server.",
    )
  }

  return `http://localhost:3000`
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
