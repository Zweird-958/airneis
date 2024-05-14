import { TRPCError, experimental_standaloneMiddleware } from "@trpc/server"
import { z } from "zod"

import { apiSources, sharedConfig } from "@airneis/config"

import { createTRPCContext } from "../trpc"

const withSource = experimental_standaloneMiddleware<{
  ctx: ReturnType<typeof createTRPCContext>
}>().create(({ ctx, next }) => {
  const rawSource = ctx.req.headers.get(sharedConfig.api.source.key)
  const source = z.enum(apiSources).safeParse(rawSource)

  if (!source.success) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Source header is missing",
    })
  }

  return next({ ctx: { ...ctx, source: source.data } })
})

export default withSource
