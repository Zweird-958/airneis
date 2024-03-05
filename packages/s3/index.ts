import { S3Client } from "@aws-sdk/client-s3"

import env from "./src/env"

export const s3 = new S3Client({
  region: "auto",
  endpoint: env.S3_URL,
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
})

export * from "@aws-sdk/client-s3"
