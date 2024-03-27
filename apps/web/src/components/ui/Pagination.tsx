import { type VariantProps, cva } from "class-variance-authority"
import type { LinkProps } from "next/link"

import Link from "@/components/ui/Link"
import { cn } from "@/utils/cn"
import config from "@/utils/config"

const paginationVariants = cva("font-semibold border rounded", {
  variants: {
    color: {
      primary: "bg-primary text-primary-foreground",
      disabled: "bg-disabled text-disabled-foreground",
    },
  },
  defaultVariants: {
    color: "primary",
  },
})

type PaginationItemProps = {
  page: number
} & LinkProps &
  VariantProps<typeof paginationVariants>

export const PaginationItem = ({
  href,
  page,
  color = "primary",
  ...props
}: PaginationItemProps) => {
  const Component = color === "disabled" ? "span" : Link

  return (
    <Component
      {...props}
      href={{
        pathname: href.toString(),
        query: { page },
      }}
      className={cn(
        "flex justify-center items-center rounded-default sm:w-12 sm:h-12 w-10 h-10",
        paginationVariants({ color }),
      )}
    >
      {page}
    </Component>
  )
}

type PaginationProps = {
  page: number | null
  href: string
  totalPages: number
}

export const Pagination = ({ page, href, totalPages }: PaginationProps) => (
  <nav className="flex gap-4">
    {Array.from(
      { length: config.pagination.step },
      (_, i) => (page ?? totalPages) - 1 - i,
    )
      .sort()
      .map(
        (prev) =>
          prev > 0 && <PaginationItem key={prev} href={href} page={prev} />,
      )}
    {page && <PaginationItem href={href} page={page} color="disabled" />}
    {Array.from(
      { length: config.pagination.step },
      (_, i) => (page ? page + 1 : totalPages) + i,
    )
      .sort()
      .map(
        (next) =>
          next <= totalPages && (
            <PaginationItem key={next} href={href} page={next} />
          ),
      )}
  </nav>
)
