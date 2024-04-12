import { FlatList, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import LocaleSelector from "@/components/LocaleSelector"
import ProductCard from "@/components/products/ProductCard"
import api from "@/utils/api"

export default function Index() {
  const { data } = api.categories.get.useQuery({
    slug: "ergonomic-concrete-soap",
    page: 1,
  })

  return (
    <SafeAreaView>
      <Text className="text-primary text-center text-5xl font-bold">
        Airneis
      </Text>
      <LocaleSelector />
      <FlatList
        contentContainerClassName="gap-4 px-4"
        data={data?.result.products}
        renderItem={({ item }) => <ProductCard product={item} key={item.id} />}
      />
    </SafeAreaView>
  )
}
