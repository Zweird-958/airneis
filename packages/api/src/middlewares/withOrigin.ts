import { TRPCError, experimental_standaloneMiddleware } from "@trpc/server"

import { createTRPCContext } from "../trpc"

const withOrigin = experimental_standaloneMiddleware<{
  ctx: ReturnType<typeof createTRPCContext>
}>().create(({ ctx, next }) => {
  const origin = ctx.req.headers.get("origin")

  if (!origin) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Origin header is missing",
    })
  }

  return next({ ctx: { ...ctx, origin } })
})

export default withOrigin
