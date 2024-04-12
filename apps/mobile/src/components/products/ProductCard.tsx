import { useRouter } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"

import { Product } from "@airneis/types"

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/products/${product.id}`)
  }

  return (
    <TouchableOpacity onPress={handleClick}>
      <View className="flex flex-col rounded-default bg-card sm:w-80 w-full">
        <View className="w-full h-52 relative">
          <Image
            className="rounded-t-lg flex-1"
            src={product.imagesUrl[0]}
            alt={product.name}
          />
        </View>
        <View className="flex-row justify-between gap-4 p-4">
          <Text className="truncate">{product.name}</Text>
          <Text>{product.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard
