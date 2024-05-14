import ProductCard from "@/components/products/ProductCard"
import ProductDetails from "@/components/products/ProductDetails"
import { useTranslation } from "@/i18n"
import api from "@/trpc/server"
import { PageProps } from "@/types/common"

type Props = PageProps & {
  params: {
    productSlug: string
  }
}

const Page = async ({ params: { productSlug: slug, locale } }: Props) => {
  const {
    result: { similarProducts, ...product },
  } = await api.products.getSingle.query({ slug })
  const { t } = await useTranslation(locale, "products")

  return (
    <div className="m-4 p-4 flex flex-col gap-20 bg-card rounded-default">
      <ProductDetails product={product} locale={locale} />
      <div className="p-4 flex flex-wrap justify-center bg-background rounded-default gap-3">
        <h3 className="w-full text-center font-semibold text-lg uppercase">
          {t("similar", { count: similarProducts.length })}
        </h3>
        {similarProducts.map((similarProduct) => (
          <ProductCard key={similarProduct.id} product={similarProduct} />
        ))}
      </div>
    </div>
  )
}

export default Page
