import type { AppRouter } from "@airneis/api"
import { createTRPCReact } from "@trpc/react-query"

export const api = createTRPCReact<AppRouter>()
