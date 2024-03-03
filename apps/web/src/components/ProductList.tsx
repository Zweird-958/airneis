"use client"

import useLocale from "@/hooks/useLocale"
import api from "@/trpc/client"

const Product = () => {
  const { data: products } = api.product.all.useQuery()
  const {
    translations: { common },
  } = useLocale()

  return (
    <div>
      <p className="text-xl text-primary">{common.client}</p>
      {products?.result.map(({ id, name }) => <p key={id}>{name}</p>)}
    </div>
  )
}

export default Product
