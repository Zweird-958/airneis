"use client"

import CheckoutCard from "@/components/products/CheckoutCard"
import useCart from "@/hooks/useCart"
import { useTranslation } from "@/i18n/client"
import api from "@/trpc/client"

const CartProductsList = () => {
  const { t } = useTranslation("checkout")
  const { cart } = useCart()
  const { data } = api.carts.checkout.useQuery(cart ?? [])

  if (!data || data.result.length === 0) {
    return (
      <div className="mx-auto rounded-default bg-card p-6 w-fit">
        <p>{t("cart.empty")}</p>
      </div>
    )
  }

  return data.result.map((product) => (
    <CheckoutCard key={product.id} product={product} />
  ))
}

export default CartProductsList
