"use client"

import CheckoutCard from "@/components/products/CheckoutCard"
import useCart from "@/hooks/useCart"
import { useTranslation } from "@/i18n/client"

const CartProductsList = () => {
  const { cart } = useCart()
  const { t } = useTranslation("checkout")

  if (!cart) {
    return (
      <div className="mx-auto rounded-default bg-card p-6 w-fit">
        <p>{t("cart.empty")}</p>
      </div>
    )
  }

  return cart.map(({ product, quantity }) => (
    <CheckoutCard key={product.id} product={product} quantity={quantity} />
  ))
}

export default CartProductsList
