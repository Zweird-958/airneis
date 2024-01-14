import api from "@/utils/api"
import { Stack } from "expo-router"
import { FlatList, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Index() {
  const { data } = api.products.all.useQuery()

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Home Page" }} />
      <Text className="text-primary text-center text-5xl font-bold">
        Airneis
      </Text>

      <FlatList
        data={data?.result}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </SafeAreaView>
  )
}
