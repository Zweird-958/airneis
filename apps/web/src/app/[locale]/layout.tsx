import type { Metadata } from "next"
import { ReactNode } from "react"

import type { PageProps } from "@airneis/types"

import Footer from "@/components/Footer"
import Header from "@/components/Header"

import "./globals.css"
import Providers from "./providers"

type Props = {
  children: ReactNode
} & PageProps

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}
const RootLayout = (props: Props) => {
  const {
    children,
    params: { locale },
  } = props

  return (
    <Providers>
      <html lang={locale} className="bg-background">
        <body className="flex flex-col justify-between w-full min-h-screen">
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </body>
      </html>
    </Providers>
  )
}

export default RootLayout
