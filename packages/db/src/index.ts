import initORM from "./utils/initORM"

export const { em, entities } = await initORM()
export { RequestContext } from "@mikro-orm/core"
