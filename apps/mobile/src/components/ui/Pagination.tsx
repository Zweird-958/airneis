import { type VariantProps, cva } from "class-variance-authority"
import { useRouter } from "expo-router"
import { Pressable, Text, View } from "react-native"

import config from "@/utils/config"

const paginationVariants = cva(
  "flex justify-center items-center rounded-default sm:w-12 sm:h-12 w-10 h-10",
  {
    variants: {
      color: {
        primary: "bg-primary text-primary-foreground",
        disabled: "bg-disabled text-disabled-foreground",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  },
)

type PaginationItemProps = {
  page: number
  className?: string
} & VariantProps<typeof paginationVariants>

export const PaginationItem = ({
  page,
  className,
  color,
  ...props
}: PaginationItemProps) => {
  const router = useRouter()
  const handleClick = () => {
    router.setParams({ page: page.toString() })
  }

  return (
    <Pressable
      {...props}
      className={paginationVariants({ className, color })}
      onPress={handleClick}
    >
      <Text>{page}</Text>
    </Pressable>
  )
}

type PaginationProps = {
  page?: string
  totalPages: number
}

export const Pagination = ({ page, totalPages }: PaginationProps) => {
  const pageParsed = page ? parseInt(page, 10) : null

  return (
    <View className="flex-row justify-center gap-4">
      {Array.from(
        { length: config.pagination.step },
        (_, i) => (pageParsed ?? totalPages) - 1 - i,
      )
        .sort()
        .map((prev) => prev > 0 && <PaginationItem key={prev} page={prev} />)}
      {pageParsed && <PaginationItem page={pageParsed} color="disabled" />}
      {Array.from(
        { length: config.pagination.step },
        (_, i) => (pageParsed ? pageParsed + 1 : totalPages) + i,
      )
        .sort()
        .map(
          (next) =>
            next <= totalPages && <PaginationItem key={next} page={next} />,
        )}
    </View>
  )
}
