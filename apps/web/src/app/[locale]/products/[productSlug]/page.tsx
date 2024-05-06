import AddToCartButton from "@/components/products/AddToCartButton"
import Carousel from "@/components/ui/Carousel"
import api from "@/trpc/server"
import { PageProps } from "@/types/common"

type Props = PageProps & {
  params: {
    productSlug: string
  }
}

const Page = async ({ params: { productSlug: slug } }: Props) => {
  const {
    result: {
      description,
      images,
      name,
      outOfStock,
      price,
      materials,
      id: productId,
    },
  } = await api.products.getSingle.query({ slug })

  return (
    <div className="m-4 p-4 bg-card rounded-default flex flex-col lg:flex-row gap-4">
      <Carousel images={images} className="lg:w-1/2" />
      <div className="flex flex-col gap-8 justify-between lg:w-1/2">
        <div className="flex flex-col gap-4 ">
          <div className="flex justify-between font-semibold text-lg lg:text-xl gap-8">
            <h2>{name.toUpperCase()}</h2>
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
          <div className="flex flex-col gap-4 text-justify">
            {description.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <AddToCartButton id={productId} outOfStock={outOfStock} />
      </div>
    </div>
  )
}

export default Page
