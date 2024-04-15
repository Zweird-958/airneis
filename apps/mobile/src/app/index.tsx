import { useRouter } from "expo-router"
import { useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import LocaleSelector from "@/components/LocaleSelector"
import useLocale from "@/hooks/useLocale"

const Index = () => {
  const {
    translations: { common },
  } = useLocale()
  const router = useRouter()
  const [category, setCategory] = useState("")
  const handleGoToCategory = () => {
    if (!category) {
      return
    }

    router.push(`/categories/${category}`)
  }

  return (
    <SafeAreaView>
      <Text className="text-primary text-center text-5xl font-bold">
        Airneis
      </Text>
      <LocaleSelector />
      <View className="flex-row items-center gap-4 px-4">
        <TextInput
          className="border-2 rounded-default p-2 flex-1"
          onChangeText={setCategory}
          value={category}
        />
        <Pressable onPress={handleGoToCategory}>
          <Text>{common.ok}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Index
