"use client"

import api from "@/trpc/client"
import useTranslations from "@/utils/i18n/client"

const Product = () => {
  const { data: products } = api.products.all.useQuery()
  const { common } = useTranslations()

  return (
    <div>
      <p className="text-xl text-primary">{common.client}</p>
      {products?.result.map(({ id, name }) => <p key={id}>{name}</p>)}
    </div>
  )
}

export default Product
