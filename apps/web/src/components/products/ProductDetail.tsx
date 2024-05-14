import { Locale, ProductDetail as Product } from "@airneis/types"

import Button from "@/components/ui/Button"
import Carousel from "@/components/ui/Carousel"
import { useTranslation } from "@/i18n"

const ProductDetail = async ({
  product,
  locale,
}: {
  product: Product
  locale: Locale
}) => {
  const { description, images, name, outOfStock, price, materials } = product
  const { t } = await useTranslation(locale, "products")

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <Carousel images={images} className="lg:w-1/2" />
      <div className="flex flex-col gap-8 justify-between lg:w-1/2">
        <div className="flex flex-col gap-4 ">
          <div className="flex justify-between font-semibold text-lg lg:text-xl gap-8">
            <h2 className="uppercase">{name}</h2>
            <span>{price}</span>
          </div>
          {materials.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {materials.map(({ id, name: materialName }) => (
                <span
                  className="w-fit px-2 py-0.5 font-light text-xs bg-primary/10 rounded-default border border-primary"
                  key={id}
                >
                  {materialName}
                </span>
              ))}
            </div>
          )}
          <p className="whitespace-pre-line">{description}</p>
        </div>
        <Button disabled={outOfStock} className="font-medium uppercase">
          {outOfStock ? t("outOfStock") : t("addToCart")}
        </Button>
      </div>
    </div>
  )
}

export default ProductDetail