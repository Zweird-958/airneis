import { Material as MaterialEntity } from "@airneis/db"

export type Material = {
  id: MaterialEntity["id"]
  name: string
}
