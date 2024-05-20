"use client"

import { ProductDetails } from "@airneis/types"

import Button from "@/components/ui/Button"
import useCart from "@/hooks/useCart"
import { useTranslation } from "@/i18n/client"

type Props = {
  product: ProductDetails
}

const AddToCartButton = ({ product }: Props) => {
  const { t } = useTranslation("products")
  const { addToCart } = useCart()
  const { outOfStock } = product
  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <Button
      disabled={outOfStock}
      className="font-medium uppercase"
      onClick={handleAddToCart}
    >
      {outOfStock ? t("outOfStock") : t("addToCart")}
    </Button>
  )
}

export default AddToCartButton
