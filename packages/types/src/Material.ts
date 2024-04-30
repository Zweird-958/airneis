import { Material as MaterialEntity } from "@airneis/db"

export type Material = {
  name: string
} & Pick<MaterialEntity, "id">
