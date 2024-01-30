import type { Locale } from "@airneis/types/Locale"

import LocaleSelector from "@/components/LocaleSelector"
import ProductList from "@/components/ProductList"
import api from "@/trpc/server"
import getTranslations from "@/utils/locale/getTranslations"
import translationInterpolator from "@/utils/locale/translationInterpolator"

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
  const { common } = await getTranslations(locale)

  if (!products) {
    return <p>nothin</p>
  }

  return (
    <div>
      <LocaleSelector />
      <p>{translationInterpolator(common.hello, { name: "Airneis" })}</p>
      <p className="text-primary text-xl">{common.server}</p>
      {products.result.map(({ id, name }) => (
        <p key={id}>{name}</p>
      ))}
      <ProductList />
    </div>
  )
}

export default Home