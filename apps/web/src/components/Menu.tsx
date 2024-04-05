"use client"

import Image from "next/image"

import Button from "@/components/ui/Button"
import Link from "@/components/ui/Link"
import useDevice from "@/hooks/useDevice"
import useSession from "@/hooks/useSession"
import { useTranslation } from "@/i18n/client"
import { footerLink, footerSocial } from "@/utils/layout/footerInfo"
import { headerLink } from "@/utils/layout/headerInfo"

const Menu = () => {
  const { t } = useTranslation()
  const device = useDevice()
  const { session, signOut } = useSession()
  const visibleHeaderLinks = headerLink.filter(
    ({ visibleOn }) =>
      visibleOn === "both" ||
      (session ? visibleOn === "auth" : visibleOn === "unAuth"),
  )

  return (
    <nav className="absolute bg-white w-full flex flex-col gap-2 px-4 py-2 border-t">
      {visibleHeaderLinks.map(({ href, common }) => (
        <Link key={href} href={href}>
          {t(`header.${common}`)}
        </Link>
      ))}
      {session && <Button onClick={signOut}>{t("header.signOut")}</Button>}
      {!device?.isAboveTablet && (
        <>
          {footerLink.map(({ href, common }) => (
            <Link key={href} href={href}>
              {t(`footer.${common}`)}
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
