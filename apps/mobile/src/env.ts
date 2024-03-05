import { z } from "zod"

const schema = z.object({
  EXPO_PUBLIC_HOST_SERVER_URL: z.string(),
})
const env = schema.parse({
  EXPO_PUBLIC_HOST_SERVER_URL: process.env.EXPO_PUBLIC_HOST_SERVER_URL,
})

export default env
