import Image from "next/image"

import { Product, SearchProduct } from "@airneis/types"

import Link from "@/components/ui/Link"

type Props = { description: string } & Pick<Product, "slug" | "name"> &
  Pick<SearchProduct, "imageUrl">

const SearchProductCard = ({ slug, imageUrl, name, description }: Props) => (
  <Link href={`/products/${slug}`} key={slug} className="flex gap-4 h-24">
    <div className="min-w-24 h-full relative">
      <Image
        src={imageUrl}
        layout="fill"
        className="object-cover rounded-default"
        alt={name}
      />
    </div>
    <div>
      <p className="font-semibold">{name}</p>
      <p className="line-clamp-2">{description}</p>
    </div>
  </Link>
)

export default SearchProductCard
