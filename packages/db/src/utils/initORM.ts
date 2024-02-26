import {
  EntityManager,
  EntityRepository,
  MikroORM,
} from "@mikro-orm/postgresql"

import { Address } from "../entities/Address"
import { Cart } from "../entities/Cart"
import { Category } from "../entities/Category"
import { DeliveryCountry } from "../entities/DeliveryCountry"
import { Image } from "../entities/Image"
import { Material } from "../entities/Material"
import { Message } from "../entities/Message"
import { Order } from "../entities/Order"
import { OrderProduct } from "../entities/OrderProduct"
import { Product } from "../entities/Product"
import { User } from "../entities/User"
import config from "../mikro-orm.config"

let cache: Services | null = null

interface Services {
  orm: MikroORM
  em: EntityManager
  entities: {
    address: EntityRepository<Address>
    cart: EntityRepository<Cart>
    category: EntityRepository<Category>
    deliveryCountry: EntityRepository<DeliveryCountry>
    image: EntityRepository<Image>
    material: EntityRepository<Material>
    message: EntityRepository<Message>
    order: EntityRepository<Order>
    orderProduct: EntityRepository<OrderProduct>
    product: EntityRepository<Product>
    user: EntityRepository<User>
  }
}

const initORM = async () => {
  if (cache) {
    return cache
  }

  const orm = await MikroORM.init(config)

  cache ||= {
    orm,
    em: orm.em,
    entities: {
      address: orm.em.getRepository(Address),
      cart: orm.em.getRepository(Cart),
      category: orm.em.getRepository(Category),
      deliveryCountry: orm.em.getRepository(DeliveryCountry),
      image: orm.em.getRepository(Image),
      material: orm.em.getRepository(Material),
      message: orm.em.getRepository(Message),
      order: orm.em.getRepository(Order),
      orderProduct: orm.em.getRepository(OrderProduct),
      product: orm.em.getRepository(Product),
      user: orm.em.getRepository(User),
    },
  }

  return cache
}

export default initORM
