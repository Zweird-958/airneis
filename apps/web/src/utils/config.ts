import { z } from "zod"

const namespaces = [
  "common",
  "forms",
  "categories",
  "zodErrors",
  "products",
] as const
const schema = z.object({
  session: z.object({
    localStorageKey: z.string(),
  }),
  locale: z.object({
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
    namespaces,
    defaultNamespace: "common",
  },
  pagination: {
    step: 2,
  },
})
export type Namespace = z.infer<typeof schema>["locale"]["defaultNamespace"]

export default config
