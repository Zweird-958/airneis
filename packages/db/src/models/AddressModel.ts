import { RelationMappings } from "objection"
import BaseModel from "packages/db/src/models/BaseModel"
import DeliveryCountryModel from "packages/db/src/models/DeliveryCountryModel"

class AddressModel extends BaseModel {
  id: string
  createdAt: Date
  updatedAt: Date
  fullName: string
  address: string
  postalCode: string
  city: string
  phoneNumber: string | null
  isFavorite: boolean
  countryId: string
  userId: string

  // En discuter à nouveau
  country?: DeliveryCountryModel

  static tableName = "addresses"

  static get relationMappings(): RelationMappings {
    return {
      country: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: DeliveryCountryModel,
        join: {
          from: "addresses.countryId",
          to: "delivery_countries.id",
        },
      },
    }
  }
}

export default AddressModel
