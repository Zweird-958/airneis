import CartProductsList from "@/components/products/CartProductsList"
import { useTranslation } from "@/i18n"
import { PageProps } from "@/types/common"

const Cart = async ({ params: { locale } }: PageProps) => {
  const { t } = await useTranslation(locale, "checkout")

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold sm:text-center">
        {t("cart.title")}
      </h1>
      <CartProductsList />
    </div>
  )
}

export default Cart
