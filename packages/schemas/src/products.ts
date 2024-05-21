import { z } from "zod"

import { slugSchema } from "./common"

export const getSingleProductSchema = z.object({
  slug: slugSchema,
})
