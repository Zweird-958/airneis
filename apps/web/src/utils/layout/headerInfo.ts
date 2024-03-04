import common from "@/locales/en/common"

type HeaderLink = {
  href: string
  common: keyof typeof common.header
  unAuth?: boolean
}[]

export const headerLink: HeaderLink = [
  {
    href: "/",
    common: "home",
  },
  {
    href: "/sign-in",
    common: "signIn",
    unAuth: true,
  },
]
