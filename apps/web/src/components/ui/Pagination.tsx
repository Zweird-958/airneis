import type { LinkProps } from "next/link"

import Link from "@/components/ui/Link"
import { cn } from "@/utils/cn"
import config from "@/utils/config"

const PAGINATION_VARIANTS = {
  primary: "bg-primary text-primary-foreground",
  disabled: "bg-disabled text-disabled-foreground",
}
type PaginationItemProps = {
  page: number
  variant?: keyof typeof PAGINATION_VARIANTS
} & LinkProps

export const PaginationItem = ({
  href,
  page,
  variant = "primary",
  ...props
}: PaginationItemProps) => {
  const Component = variant === "disabled" ? "span" : Link

  return (
    <Component
      {...props}
      href={{
        pathname: href.toString(),
        query: { page },
      }}
      className={cn(
        "flex justify-center items-center rounded-default sm:w-12 sm:h-12 w-10 h-10",
        PAGINATION_VARIANTS[variant],
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
    {page && <PaginationItem href={href} page={page} variant="disabled" />}
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
