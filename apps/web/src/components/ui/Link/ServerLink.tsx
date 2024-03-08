import Link, { LinkProps } from "next/link"

import { Locale } from "@airneis/types"

type Props = { locale: Locale } & LinkProps

export const ServerLink = ({ href, locale, ...props }: Props) => (
  <Link href={`/${locale}/${href}`} {...props} />
)
