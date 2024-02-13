import BaseModel from "packages/db/src/models/BaseModel"

class MessageModel extends BaseModel {
  id: string
  createdAt: Date
  updatedAt: Date
  email: string
  subject: string
  description: string

  static tableName = "messages"
}

export default MessageModel
