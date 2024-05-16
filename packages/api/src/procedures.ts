import withAuth from "./middlewares/withAuth"
import withOrm from "./middlewares/withOrm"
import { t } from "./trpc"

export const publicProcedure = t.procedure.use(withOrm)
export const authedProcedure = publicProcedure.use(withAuth("USER"))
export const adminProcedure = publicProcedure.use(withAuth("ADMIN"))
