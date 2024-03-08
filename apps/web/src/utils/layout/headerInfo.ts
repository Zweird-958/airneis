type HeaderLink = {
  href: string
  common: string
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
