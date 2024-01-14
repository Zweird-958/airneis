import { createTRPCReact } from "@trpc/react-query"

import type { AppRouter } from "@airneis/api"

const api = createTRPCReact<AppRouter>()

export default api
