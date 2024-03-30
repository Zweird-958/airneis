import { z } from "zod"

export const pageSchema = z.number().int().positive().default(1)
export const slugSchema = z.string()
