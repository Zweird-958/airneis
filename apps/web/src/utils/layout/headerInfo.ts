import common from "@/locales/en/common"

type HeaderLink = {
  href: string
  common: keyof typeof common.header
  visibleOn: "auth" | "unAuth" | "both"
}[]

export const headerLink: HeaderLink = [
  {
    href: "/",
    common: "home",
    visibleOn: "both",
  },
  {
    href: "/sign-in",
    common: "signIn",
    visibleOn: "unAuth",
  },
]
