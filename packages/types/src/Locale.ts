export type Locale = "en" | "fr"
export type ExtractKeys<T extends string> =
  T extends `${string}{${infer Key}}${infer Rest}`
    ? Key | ExtractKeys<Rest>
    : never
export type TranslationInterpolator<T extends string> = Record<
  ExtractKeys<T>,
  string | number
> | null
