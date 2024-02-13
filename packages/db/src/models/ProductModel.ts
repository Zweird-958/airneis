import { RelationMappings } from "objection"
import BaseModel from "packages/db/src/models/BaseModel"
import CartModel from "packages/db/src/models/CartModel"
import CategoryModel from "packages/db/src/models/CategoryModel"
import ImageModel from "packages/db/src/models/ImageModel"
import MaterialModel from "packages/db/src/models/MaterialModel"
import OrderModel from "packages/db/src/models/OrderModel"

class ProductModel extends BaseModel {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  description: string
  stock: number
  price: number

  images?: ImageModel[]
  materials?: MaterialModel[]
  categories?: CategoryModel[]
  carts?: CartModel[]
  orders?: OrderModel[]

  static tableName = "products"

  // eslint-disable-next-line max-lines-per-function
  static get relationMappings(): RelationMappings {
    return {
      images: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: ImageModel,
        join: {
          from: "products.id",
          through: {
            from: "link_images_products.productId",
            to: "link_images_products.imageId",
          },
          to: "images.id",
        },
      },
      // Est-ce réellement utile de créer cette relation ?
      materials: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: MaterialModel,
        join: {
          from: "products.id",
          through: {
            from: "link_materials_products.productId",
            to: "link_materials_products.materialId",
          },
          to: "materials.id",
        },
      },
      // Est-ce réellement utile de créer cette relation ?
      categories: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: CategoryModel,
        join: {
          from: "products.id",
          through: {
            from: "link_categories_products.productId",
            to: "link_categories_products.categoryId",
          },
          to: "categories.id",
        },
      },
      // Est-ce réellement utile de créer cette relation ?
      carts: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: CartModel,
        join: {
          from: "products.id",
          through: {
            from: "link_carts_products.productId",
            to: "link_carts_products.cartId",
          },
          to: "carts.id",
        },
      },
      // Est-ce réellement utile de créer cette relation ?
      orders: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: OrderModel,
        join: {
          from: "products.id",
          through: {
            from: "link_orders_products.productId",
            to: "link_orders_products.orderId",
          },
          to: "orders.id",
        },
      },
    }
  }
}

export default ProductModel
