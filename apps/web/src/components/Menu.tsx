"use client"

import Image from "next/image"
import Link from "next/link"

import useDevice from "@/hooks/useDevice"
import useSession from "@/hooks/useSession"
import useTranslations from "@/utils/i18n/client"
import { footerLink, footerSocial } from "@/utils/layout/footerInfo"
import { headerLink } from "@/utils/layout/headerInfo"

const Menu = () => {
  const {
    common: { header, footer },
  } = useTranslations()
  const device = useDevice()
  const { session } = useSession()
  const visibleHeaderLinks = headerLink.filter(
    ({ visibleOn }) =>
      visibleOn === "both" ||
      (session ? visibleOn === "auth" : visibleOn === "unAuth"),
  )

  return (
    <nav className="absolute bg-white w-full flex flex-col gap-2 px-4 py-2 border-t">
      {visibleHeaderLinks.map(({ href, common }) => (
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
            {footerSocial.map(({ href, src, alt }) => (
              <Link key={href} href={href}>
                <Image src={src} alt={alt} width={30} height={30} />
              </Link>
            ))}
          </div>
        </>
      )}
    </nav>
  )
}

export default Menu
