import {
  EntityManager,
  MikroORM,
  SqlEntityRepository,
} from "@mikro-orm/postgresql"

import { User } from "../entities/User"
import config from "../mikro-orm.config"

let cache: Services | null = null

interface Services {
  orm: MikroORM
  em: EntityManager
  user: SqlEntityRepository<User>
}

const initORM = async () => {
  if (cache) {
    return cache
  }

  const orm = await MikroORM.init(config)

  cache ||= {
    orm,
    em: orm.em,
    user: orm.em.getRepository(User),
  }

  return cache
}

export default initORM
