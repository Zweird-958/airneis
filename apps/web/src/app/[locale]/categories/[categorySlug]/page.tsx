import Image from "next/image"
import { notFound } from "next/navigation"

import ProductsList from "@/components/products/ProductsList"
import Card from "@/components/ui/Card"
import { Pagination } from "@/components/ui/Pagination"
import { useTranslation } from "@/i18n"
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
  params: { categorySlug, locale },
  searchParams: { page },
}: Props) => {
  const pageParsed = parseInt(page ?? "1", 10)
  const { t } = await useTranslation(locale, "categories")

  try {
    const {
      result: category,
      meta: { totalPages },
    } = await api.categories.get.query({
      slug: categorySlug,
      page: pageParsed,
    })

    return (
      <div className="flex flex-col gap-8 pb-2 items-center">
        <div className="w-full relative h-52 md:h-72">
          <Image
            src={category.imageUrl}
            layout="fill"
            className="object-cover blur-xs"
            alt={category.name}
          />
          <h1 className="absolute top-1/2 transform -translate-y-1/2 text-center w-full px-2 md:text-xl font-bold">
            {category.name}
          </h1>
        </div>

        <div className="flex flex-col gap-8 max-w-[63.5rem] px-4 items-center">
          <h2 className="text-center">{category.description}</h2>
          {category.products.length === 0 && (
            <Card>
              <p className="text-center">{t("empty")}</p>
            </Card>
          )}
          <ProductsList products={category.products} />

          <Pagination
            page={pageParsed <= totalPages ? pageParsed : null}
            href={`/categories/${categorySlug}`}
            totalPages={totalPages}
          />
        </div>
      </div>
    )
  } catch (error) {
    return notFound()
  }
}

export default Category
