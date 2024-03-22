import { config as dotenv } from "dotenv"
import { z } from "zod"

dotenv({ path: "../../.env" })

const schema = z.object({
  RESEND_API_KEY: z.string(),
})
const env = schema.parse({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
})

export default env
