import Image from "next/image"

import ProductCard from "@/components/products/ProductCard"
import { Pagination } from "@/components/ui/Pagination"
import api from "@/trpc/server"
import { PageProps } from "@/types/common"

type Props = {
  params: {
    categorySlug: string
  }
  searchParams: {
    page?: string
  }
} & PageProps

const Category = async ({
  params: { categorySlug },
  searchParams: { page },
}: Props) => {
  const pageParsed = parseInt(page ?? "1", 10)
  const {
    result: category,
    meta: { totalPages },
  } = await api.categories.get.query({
    slug: categorySlug,
    page: pageParsed,
  })

  return (
    <div className="flex flex-col gap-8 pb-2 items-center">
      <div className="w-full relative h-52 sm:h-72">
        <Image
          src={category.imageUrl}
          layout="fill"
          className="object-cover blur-xs"
          alt={category.name}
        />
        <h1 className="absolute top-1/2 transform -translate-y-1/2 text-center w-full px-2 sm:text-xl font-bold">
          {category.name}
        </h1>
      </div>

      <div className="flex flex-col gap-8 max-w-product-list px-4 items-center">
        <h2 className="text-center">{category.description}</h2>
        {category.products.length === 0 && (
          <div className="bg-card p-4 rounded-lg">
            <p className="text-center">
              There are no products in this category yet.
            </p>
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-product">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          page={pageParsed <= totalPages ? pageParsed : null}
          href={`/en/categories/${categorySlug}`}
          totalPages={totalPages}
        />
      </div>
    </div>
  )
}

export default Category
