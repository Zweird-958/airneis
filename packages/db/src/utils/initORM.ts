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
  const {
    em,
    em: { getRepository },
  } = orm

  cache ||= {
    orm,
    em,
    entities: {
      address: getRepository(Address),
      cart: getRepository(Cart),
      category: getRepository(Category),
      deliveryCountry: getRepository(DeliveryCountry),
      image: getRepository(Image),
      material: getRepository(Material),
      message: getRepository(Message),
      order: getRepository(Order),
      orderProduct: getRepository(OrderProduct),
      product: getRepository(Product),
      user: getRepository(User),
    },
  }

  return cache
}

export default initORM
