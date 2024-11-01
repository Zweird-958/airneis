"use client"

import Image from "next/image"

import Link from "@/components/ui/Link"
import useDevice from "@/hooks/useDevice"
import { useTranslation } from "@/i18n/client"
import { footerLink, footerSocial } from "@/utils/layout/footerInfo"

const Footer = () => {
  const { t } = useTranslation()
  const device = useDevice()

  if (!device?.isAboveLaptop) {
    return null
  }

  return (
    <footer className="w-full border-t z-10 bg-background">
      <div className="flex justify-between items-center w-full px-4 py-2">
        <nav>
          <ul className="flex gap-4">
            {footerLink.map(({ href, common }) => (
              <li key={href}>
                <Link href={href}>{t(`footer.${common}`)}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-2">
          {footerSocial.map(({ href, src, alt }) => (
            <Link key={href} href={href}>
              <Image src={src} alt={alt} width={30} height={30} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
