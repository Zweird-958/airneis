import GenericsShowcase from "@/components/GenericsShowcase"
import LocaleSelector from "@/components/LocaleSelector"
import ProductList from "@/components/ProductList"
import Test from "@/components/Test"
import TestForm from "@/components/forms/TestForm"
import { useTranslation } from "@/i18n"
import api from "@/trpc/server"
import { PageProps } from "@/types/common"

const Home = async ({ params: { locale } }: PageProps) => {
  const products = await api.products.all.query()
  const { t } = await useTranslation(locale, "common", "zodErrors")

  if (!products) {
    return <p>nothin</p>
  }

  return (
    <div className="m-4">
      <LocaleSelector />
      <p>{t("hello", { name: "Airneis" })}</p>
      <p>{t("zodErrors:username.length")}</p>
      <Test />
      <p className="text-primary text-xl">{t("server")}</p>
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
