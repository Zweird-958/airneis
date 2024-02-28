import { z } from "zod"

const schema = z.object({
  EXPO_PUBLIC_API_URL: z.string(),
})
const env = schema.parse({
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
})

export default env
