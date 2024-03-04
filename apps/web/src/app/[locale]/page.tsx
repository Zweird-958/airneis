import type { Locale } from "@airneis/types"

import GenericsShowcase from "@/components/GenericsShowcase"
import LocaleSelector from "@/components/LocaleSelector"
import ProductList from "@/components/ProductList"
import TestForm from "@/components/forms/TestForm"
import api from "@/trpc/server"
import useTranslations from "@/utils/i18n"

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
  const { common, t } = useTranslations(locale)

  if (!products) {
    return <p>nothin</p>
  }

  return (
    <div className="m-4">
      <LocaleSelector />
      <p>{t(common.hello, { name: "Airneis" })}</p>
      <p className="text-primary text-xl">{common.server}</p>
      {products.result.map(({ id, name }) => (
        <p key={id}>{name}</p>
      ))}
      <ProductList />
      <hr className="my-4" />
      <GenericsShowcase />
      <hr className="my-4" />
      <TestForm />
    </div>
  )
}

export default Home
