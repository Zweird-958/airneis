import common from "@/locales/en/common"

type HeaderLink = {
  label: keyof typeof common
  screen: string
  visibleOn: "auth" | "unAuth" | "both"
}[]

export const headerLink: HeaderLink = [
  {
    label: "home",
    screen: "index",
    visibleOn: "both",
  },
  {
    label: "signIn",
    screen: "sign-in",
    visibleOn: "unAuth",
  },
]
