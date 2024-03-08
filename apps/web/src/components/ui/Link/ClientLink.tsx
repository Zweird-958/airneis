"use client"

import Link, { LinkProps } from "next/link"
import { useParams } from "next/navigation"
import React from "react"

import { Locale } from "@airneis/types"

type Props = LinkProps & { children: React.ReactNode }

export const ClientLink = ({ href, ...props }: Props) => {
  const { locale } = useParams<{ locale: Locale }>()

  return <Link href={`/${locale}/${href}`} {...props} />
}
