import { Model, QueryBuilder as ObjectionQueryBuilder, Page } from "objection"

class QueryBuilder<M extends Model, R = M[]> extends ObjectionQueryBuilder<
  M,
  R
> {
  declare ArrayQueryBuilderType: QueryBuilder<M, M[]>
  declare SingleQueryBuilderType: QueryBuilder<M, M>
  declare MaybeSingleQueryBuilderType: QueryBuilder<M, M | undefined>
  declare NumberQueryBuilderType: QueryBuilder<M, number>
  declare PageQueryBuilderType: QueryBuilder<M, Page<M>>
}

export default QueryBuilder
