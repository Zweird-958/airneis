import { RequestContext } from "@airneis/db"

import { t } from "../trpc"

const withOrm = t.middleware(({ ctx: { em }, next }) =>
  RequestContext.create(em, next),
)

export default withOrm
