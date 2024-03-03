import { Facebook, Instagram, Linkedin } from "lucide-react"

import common from "@/locales/en/common"

type FooterLink = {
  href: string
  common: keyof typeof common.footer
}[]

export const footerLink: FooterLink = [
  {
    href: "/tos",
    common: "tos",
  },
  {
    href: "/legal-notice",
    common: "legalNotice",
  },
  {
    href: "/contact",
    common: "contact",
  },
]

export const footerSocial = [
  {
    href: "https://www.linkedin.com",
    Icon: Linkedin,
  },
  {
    href: "https://www.instagram.com",
    Icon: Instagram,
  },
  {
    href: "https://www.facebook.com",
    Icon: Facebook,
  },
]
