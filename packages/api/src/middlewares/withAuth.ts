import { TRPCError } from "@trpc/server"

import { UserRoles } from "@airneis/types"

import { t } from "../trpc"
import getSession from "../utils/getSession"

const withAuth = (minimumRole: keyof typeof UserRoles) =>
  t.middleware(async ({ ctx, next }) => {
    const session = getSession()

    if (!session) {
      throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    const user = await ctx.entities.user.findOne({
      id: session.user.id,
      deletedAt: null,
    })

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      })
    }

    if (minimumRole === "ADMIN" && session.user.role !== "ADMIN") {
      throw new TRPCError({ code: "FORBIDDEN" })
    }

    return next({ ctx: { ...ctx, session, user } })
  })

export default withAuth
