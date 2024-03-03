import { FlatList, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import LocaleSelector from "@/components/LocaleSelector"
import api from "@/utils/api"

export default function Index() {
  const { data } = api.product.all.useQuery()

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
