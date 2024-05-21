import {
  EntityManager,
  EntityRepository,
  MikroORM,
} from "@mikro-orm/postgresql"

import { Address } from "../entities/Address"
import { Cart } from "../entities/Cart"
import { Category } from "../entities/Category"
import { Contacts } from "../entities/Contacts"
import { DeliveryCountry } from "../entities/DeliveryCountry"
import { Image } from "../entities/Image"
import { Material } from "../entities/Material"
import { Order } from "../entities/Order"
import { OrderProduct } from "../entities/OrderProduct"
import { Product } from "../entities/Product"
import { User } from "../entities/User"
import config from "../mikro-orm.config"

let cache: Services | null = null

interface Services {
  em: EntityManager
  entities: {
    address: EntityRepository<Address>
    cart: EntityRepository<Cart>
    category: EntityRepository<Category>
    deliveryCountry: EntityRepository<DeliveryCountry>
    image: EntityRepository<Image>
    material: EntityRepository<Material>
    contacts: EntityRepository<Contacts>
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
    em: orm.em,
    entities: {
      address: orm.em.getRepository(Address),
      cart: orm.em.getRepository(Cart),
      category: orm.em.getRepository(Category),
      deliveryCountry: orm.em.getRepository(DeliveryCountry),
      image: orm.em.getRepository(Image),
      material: orm.em.getRepository(Material),
      contacts: orm.em.getRepository(Contacts),
      order: orm.em.getRepository(Order),
      orderProduct: orm.em.getRepository(OrderProduct),
      product: orm.em.getRepository(Product),
      user: orm.em.getRepository(User),
    },
  }

  return cache
}

export default initORM
