"use client"

import { Trash2 } from "lucide-react"
import Image from "next/image"

import { CheckoutProduct } from "@airneis/types"

import QuantityForm from "@/components/forms/QuantityForm"

type Props = {
  product: CheckoutProduct
}

const CheckoutCard = ({ product }: Props) => {
  const { imageUrl, name, description, price, quantity, id } = product

  return (
    <div className="flex gap-4 max-w-[700px] h-32 md:h-52">
      <div className="w-full max-w-52 relative">
        <Image
          layout="fill"
          className="object-cover rounded-default"
          src={imageUrl}
          alt={name}
        />
      </div>
      <div className="basis-1/3 justify-between flex flex-col">
        <h2 className="line-clamp-1 font-semibold">{name}</h2>
        <h3 className="line-clamp-[4] md:line-clamp-[7]">{description}</h3>
      </div>
      <div className="flex flex-col justify-between items-center">
        <p className="font-semibold">{price}</p>
        <QuantityForm quantity={quantity} id={id} />
        <Trash2 />
      </div>
    </div>
  )
}

export default CheckoutCard
