import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

import ProductCard from "@/components/products/ProductCard"
import ProductDetail from "@/components/products/ProductDetail"
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
    result: { similarProducts, ...product },
  } = data

  return (
    <ScrollView>
      <View className="m-4 p-4 flex flex-col gap-20 bg-card rounded-default">
        <ProductDetail product={product} />
        {similarProducts.length > 0 && (
          <View className="p-4 flex flex-wrap justify-center bg-background rounded-default gap-3">
            <Text className="w-full text-center font-semibold text-lg uppercase">
              {similarProducts.length === 1
                ? products.similarOne
                : products.similarOther}
            </Text>
            {similarProducts.map((similarProduct) => (
              <ProductCard key={similarProduct.id} product={similarProduct} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default Product
