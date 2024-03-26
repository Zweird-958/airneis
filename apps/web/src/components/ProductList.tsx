"use client"

import { useTranslation } from "@/i18n/client"
import api from "@/trpc/client"

const Product = () => {
  const { data: products } = api.products.all.useQuery()
  const { t } = useTranslation()

  return (
    <div>
      <p className="text-xl text-primary">{t("client")}</p>
      {products?.result.map(({ id, name }) => <p key={id}>{name}</p>)}
    </div>
  )
}

export default Product
