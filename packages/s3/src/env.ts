import { config as dotenv } from "dotenv"
import { z } from "zod"

dotenv({ path: "../../.env" })

const schema = z.object({
  S3_URL: z.string().url(),
})
const env = schema.parse({
  S3_URL: process.env.S3_URL,
})

export default env
