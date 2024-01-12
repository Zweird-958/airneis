"use client"

import api from "@/trpc/client"

const Product = () => {
  const { data: products } = api.products.all.useQuery()

  return (
    <div>
      <p className="text-xl">Client</p>
      {products?.result.map(({ id, name }) => <p key={id}>{name}</p>)}
    </div>
  )
}

export default Product
