import { z } from "zod"

const schema = z.object({
  EXPO_PUBLIC_HOST_SERVER_URL: z.string(),
  JWT_SECRET: z.string(),
})
const env = schema.parse({
  EXPO_PUBLIC_HOST_SERVER_URL: process.env.EXPO_PUBLIC_HOST_SERVER_URL,
  JWT_SECRET: process.env.JWT_SECRET,
})

export default env
