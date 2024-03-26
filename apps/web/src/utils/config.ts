import { z } from "zod"

const namespaces = ["common", "forms", "categories", "zodErrors"] as const
const schema = z.object({
  session: z.object({
    localStorageKey: z.string(),
  }),
  locale: z.object({
    cookieKey: z.string(),
    namespaces: z.array(z.enum(namespaces)),
    defaultNamespace: z.enum(namespaces),
  }),
  pagination: z.object({
    step: z.number().min(1).default(1),
  }),
})
const config = schema.parse({
  session: {
    localStorageKey: "session",
  },
  locale: {
    cookieKey: "lang",
    namespaces,
    defaultNamespace: "common",
  },
  pagination: {
    step: 2,
  },
})
export type Namespace = z.infer<typeof schema>["locale"]["defaultNamespace"]

export default config
