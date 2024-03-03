"use client"

import Link from "next/link"

import useDevice from "@/hooks/useDevice"
import useLocale from "@/hooks/useLocale"
import { footerLink, footerSocial } from "@/utils/layout/footerInfo"
import { headerLink } from "@/utils/layout/headerInfo"

const Menu = () => {
  const {
    translations: {
      common: { header, footer },
    },
  } = useLocale()
  const device = useDevice()

  return (
    <nav className="w-full flex flex-col gap-2 px-4 py-2 border-t">
      {headerLink.map(({ href, common }) => (
        <Link key={href} href={href}>
          {header[common]}
        </Link>
      ))}
      {!device?.isAboveTablet && (
        <>
          {footerLink.map(({ href, common }) => (
            <Link key={href} href={href}>
              {footer[common]}
            </Link>
          ))}
          <div className="flex gap-2">
            {footerSocial.map(({ href, Icon }) => (
              <Link key={href} href={href}>
                <Icon />
              </Link>
            ))}
          </div>
        </>
      )}
    </nav>
  )
}

export default Menu
