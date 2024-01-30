import type {
  ExtractKeys,
  TranslationInterpolator,
} from "@airneis/types/Locale"

const translationInterpolator = <T extends string>(
  translation: T,
  values: TranslationInterpolator<T>,
) =>
  values
    ? translation.replace(/\{([^{}]+)\}/gu, (_, key: ExtractKeys<T>) =>
        String(values[key]),
      )
    : translation

export default translationInterpolator
