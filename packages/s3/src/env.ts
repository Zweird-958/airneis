import { config as dotenv } from "dotenv"
import { z } from "zod"

dotenv({ path: "../../.env" })

const schema = z.object({
  LOCALSTACK_S3_URL: z.string().url(),
})
const env = schema.parse({
  LOCALSTACK_S3_URL: process.env.LOCALSTACK_S3_URL,
})

export default env
