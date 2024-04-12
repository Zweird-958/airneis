import { useLocalSearchParams } from "expo-router"
import { FlatList, Image, Text, View } from "react-native"

import ProductCard from "@/components/products/ProductCard"
import useLocale from "@/hooks/useLocale"
import api from "@/utils/api"

const Category = () => {
  const {
    translations: { categories, common },
  } = useLocale()
  const { categorySlug } = useLocalSearchParams<{ categorySlug: string }>()
  const { data, isFetching, error } = api.categories.get.useQuery({
    slug: categorySlug,
    page: 1,
  })

  if (isFetching) {
    return <Text>{common.loading}</Text>
  }

  if (error || !data) {
    return <Text>{error ? error.message : categories.error}</Text>
  }

  const { result: category } = data

  return (
    <View className="gap-4 flex-1">
      <View className="w-full relative h-52">
        <Image src={category.imageUrl} className="flex-1" alt={category.name} />
        <Text className="absolute top-1/2 transform -translate-y-1/2 text-center w-full px-2 sm:text-xl font-bold">
          {category.name}
        </Text>
      </View>
      <View className="gap-4 px-4 flex-1">
        {category.products.length === 0 && (
          <View className="bg-card p-4 rounded-default">
            <Text className="text-center">{categories.empty}</Text>
          </View>
        )}
        <Text className="text-center">{category.description}</Text>
        <FlatList
          className="mb-8"
          contentContainerClassName="gap-4"
          data={category.products}
          renderItem={({ item }) => (
            <ProductCard product={item} key={item.id} />
          )}
        />
      </View>
    </View>
  )
}

export default Category
