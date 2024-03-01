import { FlatList, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import LocaleSelector from "@/components/LocaleSelector"
import useLocale from "@/hooks/useLocale"
import api from "@/utils/api"

export default function Index() {
  const { data } = api.products.all.useQuery()
  const {
    translations: { common },
    t,
  } = useLocale()

  return (
    <SafeAreaView>
      <Text className="text-primary text-center text-5xl font-bold">
        Airneis
      </Text>
      <LocaleSelector />
      <FlatList
        data={data?.result}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </SafeAreaView>
  )
}
