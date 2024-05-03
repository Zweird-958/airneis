type HeaderLink = {
  label: string
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
