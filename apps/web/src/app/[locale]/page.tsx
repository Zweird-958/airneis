import type { Locale } from "@airneis/types"

import GenericsShowcase from "@/components/GenericsShowcase"
import LocaleSelector from "@/components/LocaleSelector"
import ProductList from "@/components/ProductList"
import api from "@/trpc/server"
import getTranslations from "@/utils/locale/getTranslations"

type PageProps = {
  params: {
    locale: Locale
  }
}

const Home = async (props: PageProps) => {
  const {
    params: { locale },
  } = props
  const products = await api.products.all.query()
  const { common, t } = await getTranslations(locale)

  if (!products) {
    return <p>nothin</p>
  }

  return (
    <div>
      <LocaleSelector />
      <p>{t(common.hello, { name: "Airneis" })}</p>
      <p className="text-primary text-xl">{common.server}</p>
      {products.result.map(({ id, name }) => (
        <p key={id}>{name}</p>
      ))}
      <ProductList />
      <hr className="mb-4" />
      <GenericsShowcase />
    </div>
  )
}

export default Home
