import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

const env = createEnv({
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    VERCEL_ENV: z.enum(["development", "preview", "production"]).optional(),
    VERCEL_URL: z
      .string()
      .optional()
      .transform((v) => v && `https://${v}`),
    PORT: z.coerce.number().default(3000),
  },
  runtimeEnv: {
    PORT: process.env.PORT,
    VERCEL_URL: process.env.VERCEL_URL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation:
    Boolean(process.env.CI) ||
    Boolean(process.env.SKIP_ENV_VALIDATION) ||
    process.env.npm_lifecycle_event === "lint",
})

export default env
