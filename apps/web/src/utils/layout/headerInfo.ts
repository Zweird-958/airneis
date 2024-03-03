import common from "@/locales/en/common"

type HeaderLink = {
  href: string
  common: keyof typeof common.header
}[]

export const headerLink: HeaderLink = [
  {
    href: "/",
    common: "home",
  },
]
