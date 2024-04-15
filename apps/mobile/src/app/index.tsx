import { FlatList, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import LocaleSelector from "@/components/LocaleSelector"
import useSession from "@/hooks/useSession"
import api from "@/utils/api"

export default function Index() {
  const { data } = api.products.all.useQuery()
  const { session } = useSession()

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
      {session && <Text>{session}</Text>}
    </SafeAreaView>
  )
}
