import { Image as ImageEntity } from "@airneis/db"

export type Image = Pick<ImageEntity, "id" | "url">
