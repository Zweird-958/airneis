import { Migrator } from "@mikro-orm/migrations"
import { defineConfig } from "@mikro-orm/postgresql"
import { SeedManager } from "@mikro-orm/seeder"

import { Address } from "./entities/Address"
import { Cart } from "./entities/Cart"
import { Category } from "./entities/Category"
import { Contact } from "./entities/Contact"
import { DeliveryCountry } from "./entities/DeliveryCountry"
import { Image } from "./entities/Image"
import { Material } from "./entities/Material"
import { Order } from "./entities/Order"
import { OrderProduct } from "./entities/OrderProduct"
import { Product } from "./entities/Product"
import { User } from "./entities/User"
import env from "./env"

export default defineConfig({
  host: env.DATABASE_HOST,
  dbName: env.DATABASE_NAME,
  port: env.DATABASE_PORT,
  user: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  entities: [
    Address,
    Cart,
    Category,
    DeliveryCountry,
    Image,
    Material,
    Contact,
    Order,
    OrderProduct,
    Product,
    User,
  ],
  extensions: [Migrator, SeedManager],
  debug: process.env.NODE_ENV !== "production",
})
