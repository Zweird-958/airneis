import clsx from "clsx"
import { Pressable, Text, View } from "react-native"

import { sharedConfig } from "@airneis/config"

import useLocale from "@/hooks/useLocale"

const LocaleSelector = () => {
  const {
    locale,
    changeLocale,
    translations: { common },
    t,
  } = useLocale()

  return (
    <View className="flex flex-row justify-center gap-2">
      {sharedConfig.languageKeys.map((key) => (
        <Pressable
          key={key}
          onPress={() => changeLocale(key)}
          data-locale={key}
          className={clsx("px-2", { "border-b-2": key === locale })}
          accessibilityLabel={t(common.changeLanguage, {
            language: key.toLowerCase(),
          })}
        >
          <Text>{key.toUpperCase()}</Text>
        </Pressable>
      ))}
    </View>
  )
}

export default LocaleSelector
