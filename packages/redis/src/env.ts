import { config as dotenv } from "dotenv"
import { z } from "zod"

dotenv({ path: "../../.env" })

const schema = z.object({
  REDIS_URL: z.string(),
})
const env = schema.parse({
  REDIS_URL: process.env.REDIS_URL,
})

export default env
