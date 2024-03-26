import Image from "next/image"
import Link from "next/link"

import type { Locale, Product } from "@airneis/types"

import { useTranslation } from "@/i18n"

const ProductCard = async ({
  product,
  locale,
}: {
  product: Product
  locale: Locale
}) => {
  const { t } = await useTranslation(locale, "products")

  return (
    <Link
      href={`/products/${product.id}`}
      className="w-full h-64 flex flex-col sm:w-product rounded-lg bg-card"
    >
      <div className="w-full h-52 relative">
        <Image
          src={product.imagesUrl[0]}
          layout="fill"
          className="object-cover rounded-t-lg"
          alt={product.name}
        />
        {product.outOfStock && (
          <div className="absolute bottom-0 w-full py-2 bg-danger">
            <p className="text-center text-danger-foreground font-semibold">
              {t("outOfStock")}
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-between gap-4 p-4">
        <h3 className="truncate">{product.name}</h3>
        <h4>{product.price}</h4>
      </div>
    </Link>
  )
}

export default ProductCard
