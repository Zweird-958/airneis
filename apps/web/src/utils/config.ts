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
})
export type Namespace = z.infer<typeof schema>["locale"]["defaultNamespace"]

export default config
