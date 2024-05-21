import { Product } from "@airneis/types"

import ProductCard from "@/components/products/ProductCard"

type Props = {
  products: Product[]
}

const ProductsList = ({ products }: Props) => (
  <div className="flex flex-wrap justify-center gap-3">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
)

export default ProductsList
