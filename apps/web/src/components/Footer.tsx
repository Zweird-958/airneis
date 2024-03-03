"use client"

import Link from "next/link"

import useDevice from "@/hooks/useDevice"
import useLocale from "@/hooks/useLocale"
import { footerLink, footerSocial } from "@/utils/layout/footerInfo"

const Footer = () => {
  const {
    translations: {
      common: { footer },
    },
  } = useLocale()
  const device = useDevice()

  return (
    device?.isAboveTablet && (
      <footer className="w-full border-t">
        <div className="flex justify-between w-full px-4 py-2">
          <nav>
            <ul className="flex gap-4">
              {footerLink.map(({ href, common }) => (
                <li key={href}>
                  <Link href={href}>{footer[common]}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex gap-2">
            {footerSocial.map(({ href, Icon }) => (
              <Link key={href} href={href}>
                <Icon />
              </Link>
            ))}
          </div>
        </div>
      </footer>
    )
  )
}

export default Footer
