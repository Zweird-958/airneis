import { config as dotenv } from "dotenv"
import { z } from "zod"

dotenv({ path: "../../.env" })

const schema = z.object({
  S3_URL: z.string().url(),
  S3_BUCKET: z.string(),
  S3_ACCESS_KEY_ID: z.string(),
  S3_SECRET_KEY: z.string(),
})
const env = schema.parse({
  S3_URL: process.env.S3_URL,
  S3_BUCKET: process.env.S3_BUCKET,
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY,
})

export default env
