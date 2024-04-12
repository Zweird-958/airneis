import { Image as DbImage } from "@airneis/db"

export type Image = Pick<DbImage, "id" | "url">
