import { Pressable, Text, View } from "react-native"

import { ProductDetails as Product } from "@airneis/types"
import { cn } from "@airneis/utils"

import Carousel from "@/components/ui/Carousel"
import useLocale from "@/hooks/useLocale"

const ProductDetails = ({
  product,
}: {
  product: Omit<Product, "similarProducts" | "categories">
}) => {
  const {
    translations: { products },
  } = useLocale()
  const { description, images, name, outOfStock, price, materials } = product

  return (
    <View className="flex flex-col gap-4">
      <Carousel images={images} />
      <View className="flex flex-col gap-8 justify-between">
        <View className="flex flex-col gap-4 ">
          <View className="flex flex-row gap-8 justify-between">
            <Text className="font-semibold text-lg uppercase w-2/3">
              {name}
            </Text>
            <Text className="font-semibold text-lg">{price}</Text>
          </View>
          {materials.length > 1 && (
            <View className="flex flex-row flex-wrap gap-2">
              {materials.map(({ id: materialId, name: materialName }) => (
                <Text
                  className="w-fit px-2 py-0.5 font-light text-xs bg-primary/10 rounded-default border border-primary"
                  key={materialId}
                >
                  {materialName}
                </Text>
              ))}
            </View>
          )}
          <Text className="whitespace-pre-line">{description}</Text>
        </View>
        <Pressable
          disabled={outOfStock}
          className={cn(
            "w-full rounded-default py-2 px-3",
            outOfStock ? "bg-disabled" : "bg-primary",
          )}
        >
          <Text className="font-semibold text-lg text-primary-foreground text-center uppercase">
            {outOfStock ? products.outOfStock : products.addToCart}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default ProductDetails
