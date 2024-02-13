import BaseModel from "packages/db/src/models/BaseModel"

class DeliveryCountryModel extends BaseModel {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  vat: number

  static tableName = "delivery_countries"
}

export default DeliveryCountryModel
