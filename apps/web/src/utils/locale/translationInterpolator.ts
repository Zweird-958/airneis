const translationInterpolator = (
  translation: string,
  values: Record<string, string>,
) => {
  let translated = translation
  Object.keys(values).forEach((key) => {
    translated = translated.replace(`{${key}}`, values[key])
  })

  return translated
}

export default translationInterpolator
