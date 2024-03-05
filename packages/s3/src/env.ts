import { config as dotenv } from "dotenv"
import { z } from "zod"

dotenv({ path: "../../.env" })

const schema = z.object({
  S3_URL: z.string().url(),
  S3_BUCKET: z.string(),
})
const env = schema.parse({
  S3_URL: process.env.S3_URL,
  S3_BUCKET: process.env.S3_BUCKET,
})

export default env
