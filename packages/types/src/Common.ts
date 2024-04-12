import { BaseEntity, Image as DbImage } from "@airneis/db"

export type Id = Pick<BaseEntity, "id">
export type Image = Pick<DbImage, "id" | "url">
