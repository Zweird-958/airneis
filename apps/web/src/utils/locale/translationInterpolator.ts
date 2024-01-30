type ExtractKeys<S extends string> =
  S extends `${string}{${infer Key}}${infer Rest}`
    ? Key | ExtractKeys<Rest>
    : never

const translationInterpolator = <T extends string>(
  translation: T,
  values: Record<ExtractKeys<T>, string | number>,
) =>
  translation.replace(/\{([^{}]+)\}/gu, (_, key: ExtractKeys<T>) =>
    String(values[key]),
  )

export default translationInterpolator
