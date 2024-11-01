import { cva } from "class-variance-authority"
import type { LinkProps } from "next/link"

import Link from "@/components/ui/Link"
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
  href?: LinkProps["href"]
} & Omit<LinkProps, "href">

export const PaginationItem = ({
  href,
  page,
  className,
  ...props
}: PaginationItemProps) =>
  href ? (
    <Link
      {...props}
      href={{
        pathname: href.toString(),
        query: { page },
      }}
      className={paginationVariants({ className })}
    >
      {page}
    </Link>
  ) : (
    <span
      {...props}
      className={paginationVariants({ color: "disabled", className })}
    >
      {page}
    </span>
  )

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
    {page && <PaginationItem page={page} />}
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
