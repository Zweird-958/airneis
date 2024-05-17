"use client"

import { ProductDetails as Product } from "@airneis/types"

import AddToCartButton from "@/components/products/AddToCartButton"
import Carousel from "@/components/ui/Carousel"

type Props = {
  product: Omit<Product, "similarProducts">
}

const ProductDetails = ({ product }: Props) => {
  const { description, images, name, outOfStock, price, materials, id } =
    product

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
        <AddToCartButton id={id} outOfStock={outOfStock} />
      </div>
    </div>
  )
}

export default ProductDetails
