"use client"

import Image from "next/image"
import Link from "next/link"

import { ClientLink } from "@/components/ui/Link"
import useDevice from "@/hooks/useDevice"
import useLocale from "@/hooks/useLocale"
import useSession from "@/hooks/useSession"
import { footerLink, footerSocial } from "@/utils/layout/footerInfo"
import { headerLink } from "@/utils/layout/headerInfo"

const Menu = () => {
  const {
    translations: {
      common: { header, footer },
    },
  } = useLocale()
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
        <ClientLink key={href} href={href}>
          {header[common]}
        </ClientLink>
      ))}
      {!device?.isAboveTablet && (
        <>
          {footerLink.map(({ href, common }) => (
            <ClientLink key={href} href={href}>
              {footer[common]}
            </ClientLink>
          ))}
          <div className="flex gap-2">
            {footerSocial.map(({ href, src, alt }) => (
              <ClientLink key={href} href={href}>
                <Image src={src} alt={alt} width={30} height={30} />
              </ClientLink>
            ))}
          </div>
        </>
      )}
    </nav>
  )
}

export default Menu
