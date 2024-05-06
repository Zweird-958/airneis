"use client"

import { Product } from "packages/types"

import Button from "@/components/ui/Button"
import useCart from "@/hooks/useCart"
import { useTranslation } from "@/i18n/client"

type Props = Pick<Product, "id" | "outOfStock">

const AddToCartButton = ({ id, outOfStock }: Props) => {
  const { t } = useTranslation("products")
  const { addToCart } = useCart()
  const handleAddToCart = () => {
    addToCart(id)
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
