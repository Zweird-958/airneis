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
    href: "/contact",
    common: "contact",
    visibleOn: "both",
  },
  {
    href: "/sign-in",
    common: "signIn",
    visibleOn: "unAuth",
  },
  {
    href: "/sign-up",
    common: "signUp",
    visibleOn: "unAuth",
  },
]
