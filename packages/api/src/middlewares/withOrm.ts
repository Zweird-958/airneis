import { RequestContext } from "@airneis/db"

import { tRPCInit } from "../trpc"

const withOrm = (t: tRPCInit) =>
  t.middleware(({ ctx: { em }, next }) => RequestContext.create(em, next))

export default withOrm
