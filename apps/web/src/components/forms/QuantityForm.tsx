"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { UpdateQuantityInput, updateQuantitySchema } from "@airneis/schemas"
import { CheckoutProduct } from "@airneis/types"

import QuantityField from "@/components/forms/fields/QuantityField"
import { Form } from "@/components/ui/Form"
import useCart from "@/hooks/useCart"

type Props = Pick<CheckoutProduct, "quantity" | "id">

const DEBOUNCE_QUANTITY_TIME = 1000
const QuantityForm = ({ quantity, id }: Props) => {
  const { updateQuantity } = useCart()
  const previousQuantity = useRef(quantity)
  const form = useForm<UpdateQuantityInput>({
    resolver: zodResolver(updateQuantitySchema),
    defaultValues: {
      quantity,
    },
  })
  const handleSubmit: SubmitHandler<UpdateQuantityInput> = ({
    quantity: newQuantity,
  }) => {
    if (newQuantity === quantity) {
      return
    }

    updateQuantity(id, newQuantity)
  }
  const handleChange = () => {
    const newQuantity = form.getValues("quantity")

    if (newQuantity !== previousQuantity.current) {
      previousQuantity.current = newQuantity

      setTimeout(() => {
        if (newQuantity === previousQuantity.current) {
          form.handleSubmit(handleSubmit)()
        }
      }, DEBOUNCE_QUANTITY_TIME)
    }
  }

  useEffect(() => {
    form.setValue("quantity", quantity)
  }, [form, quantity])

  return (
    <Form
      ctx={form}
      onSubmit={handleSubmit}
      onChange={handleChange}
      className="space-y-6"
    >
      <QuantityField control={form.control} />
    </Form>
  )
}

export default QuantityForm
