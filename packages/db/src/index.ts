import { EntityManager, MikroORM } from "@mikro-orm/postgresql"

import initORM from "@/utils/initORM"

export const { em, orm }: Services = await initORM()
export * from "./entities"

export interface Services {
  orm: MikroORM
  em: EntityManager
}
