import BaseModel from "packages/db/src/models/BaseModel"

class ImageModel extends BaseModel {
  id: string
  createdAt: Date
  updatedAt: Date
  url: string

  static tableName = "images"
}

export default ImageModel
