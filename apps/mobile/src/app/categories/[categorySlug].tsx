import { useLocalSearchParams } from "expo-router"
import { FlatList, Image, Text, View } from "react-native"

import ProductCard from "@/components/products/ProductCard"
import LoadingView from "@/components/ui/LoadingView"
import { Pagination } from "@/components/ui/Pagination"
import useLocale from "@/hooks/useLocale"
import api from "@/utils/api"

const Category = () => {
  const {
    translations: { categories },
  } = useLocale()
  const { categorySlug, page } = useLocalSearchParams<{
    categorySlug: string
    page?: string
  }>()
  const pageParsed = page ? parseInt(page, 10) : 1
  const { data, isLoading, error } = api.categories.get.useQuery({
    slug: categorySlug,
    page: pageParsed,
  })

  if (isLoading) {
    return <LoadingView />
  }

  if (error || !data) {
    return <Text>{error ? error.message : categories.error}</Text>
  }

  const {
    result: category,
    meta: { totalPages },
  } = data

  return (
    <View className="gap-4 flex-1 pb-8">
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
          contentContainerClassName="gap-4"
          data={category.products}
          renderItem={({ item }) => (
            <ProductCard product={item} key={item.id} />
          )}
        />
      </View>
      <Pagination page={pageParsed} totalPages={totalPages} />
    </View>
  )
}

export default Category
