import type { ExtractKeys, TranslationInterpolator } from "@airneis/types"

export const translationInterpolator = <T extends string>(
  translation: T,
  values: TranslationInterpolator<T>,
) =>
  translation.replace(/\{([^{}]+)\}/gu, (_, key: ExtractKeys<T>) =>
    String(values[key]),
  )
