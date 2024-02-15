import { MikroORM } from "@mikro-orm/postgresql"

import { Services } from "@/index"
import config from "@/mikro-orm.config"

let cache: Promise<Services> | null = null

const initORM = async (): Promise<Services> => {
  const orm = await MikroORM.init(config)

  cache ||= Promise.resolve({
    orm,
    em: orm.em,
  })

  return cache
}

export default initORM
