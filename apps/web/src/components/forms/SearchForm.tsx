"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRef } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { SearchProductsInput, searchProductsSchema } from "@airneis/schemas"

import SearchField from "@/components/forms/fields/SearchField"
import SearchProductCard from "@/components/products/SearchProductCard"
import Card from "@/components/ui/Card"
import { Form } from "@/components/ui/Form"
import { useTranslation } from "@/i18n/client"
import api from "@/trpc/client"

const DEBOUNCE_QUANTITY_TIME = 1000
const SearchForm = () => {
  const { mutate: searchMutate, data } = api.products.search.useMutation()
  const { t } = useTranslation("forms")
  const previousQuery = useRef("")
  const form = useForm<SearchProductsInput>({
    resolver: zodResolver(searchProductsSchema),
    defaultValues: {
      query: "",
    },
  })
  const handleSubmit: SubmitHandler<SearchProductsInput> = (values) => {
    searchMutate(values)
  }
  const handleChange = () => {
    const newQuery = form.getValues("query")

    if (newQuery !== previousQuery.current) {
      previousQuery.current = newQuery

      setTimeout(() => {
        if (newQuery === previousQuery.current && newQuery.length > 0) {
          form.handleSubmit(handleSubmit)()
        }
      }, DEBOUNCE_QUANTITY_TIME)
    }
  }
  const hasResult = data && data.result.length > 0

  return (
    <Form
      className="space-y-4 max-w-xl w-full"
      ctx={form}
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      <SearchField control={form.control} />
      {hasResult && (
        <Card className="flex flex-col gap-2">
          {data?.result.map((product) => (
            <SearchProductCard key={product.id} {...product} />
          ))}
        </Card>
      )}
      {!hasResult && form.watch("query") !== "" && (
        <Card>
          <p>{t("search.noResults")}</p>
        </Card>
      )}
    </Form>
  )
}

export default SearchForm
