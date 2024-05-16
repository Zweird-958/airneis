import { TRPCError } from "@trpc/server"

import withAuth from "./withAuth"

const withUser = withAuth("USER").unstable_pipe(async ({ ctx, next }) => {
  const { session, entities } = ctx
  const user = await entities.user.findOne({
    id: session.user.id,
    deletedAt: null,
  })

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    })
  }

  return next({ ctx: { ...ctx, user } })
})

export default withUser
