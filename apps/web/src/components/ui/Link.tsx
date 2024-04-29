"use client"

import NextLink, { LinkProps } from "next/link"
import { useParams } from "next/navigation"
import { ReactNode } from "react"

import type { Locale } from "@airneis/config"

type Props = {
  children: ReactNode
  className?: string
} & LinkProps

const Link = ({ href, ...props }: Props) => {
  const { locale } = useParams<{ locale: Locale }>()
  const hrefParsed =
    typeof href !== "string"
      ? { ...href, pathname: `/${locale}${href.pathname}` }
      : `/${locale}${href}`

  return <NextLink href={hrefParsed} {...props} />
}

export default Link
