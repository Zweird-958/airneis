import type { AppRouter } from "@airneis/api"
import { createTRPCReact } from "@trpc/react-query"

const api = createTRPCReact<AppRouter>()

export default api
