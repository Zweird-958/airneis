"use client"

import Image from "next/image"

import type { Product } from "@airneis/types"

import Link from "@/components/ui/Link"
import { useTranslation } from "@/i18n/client"

const ProductCard = ({ product }: { product: Product }) => {
  const { t } = useTranslation("products")

  return (
    <Link
      href={`/products/${product.slug}`}
      className="h-64 flex flex-col rounded-default bg-card sm:w-80 w-full"
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
