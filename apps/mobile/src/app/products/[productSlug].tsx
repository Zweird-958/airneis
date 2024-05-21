import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

import ProductDetails from "@/components/products/ProductDetails"
import LoadingView from "@/components/ui/LoadingView"
import useLocale from "@/hooks/useLocale"
import api from "@/utils/api"

const Product = () => {
  const {
    translations: { products },
  } = useLocale()
  const { productSlug: slug } = useLocalSearchParams<{ productSlug: string }>()
  const { data, isLoading, isError, error } = api.products.getSingle.useQuery({
    slug,
  })

  if (isLoading) {
    return <LoadingView />
  }

  if (isError || !data) {
    return <Text>{isError ? error.message : products.error}</Text>
  }

  const {
    result: { similarProducts: _, ...product },
  } = data

  return (
    <View className="m-4 p-4 bg-card rounded-default">
      <ProductDetails product={product} />
    </View>
  )
}

export default Product
