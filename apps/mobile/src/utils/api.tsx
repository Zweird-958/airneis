import { createTRPCReact } from "@trpc/react-query"
import type { AppRouter } from "@airneis/api/src"

const api = createTRPCReact<AppRouter>()

export default api
