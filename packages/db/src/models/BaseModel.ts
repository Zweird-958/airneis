import { Model } from "objection"
import QueryBuilder from "packages/db/src/QueryBuilder"

class BaseModel extends Model {
  declare QueryBuilderType: QueryBuilder<this>
  static QueryBuilder = QueryBuilder
}

export default BaseModel
