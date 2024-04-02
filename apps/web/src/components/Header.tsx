"use client"

import { MenuIcon, Search, ShoppingCart, X } from "lucide-react"
import { useState } from "react"

import Menu from "@/components/Menu"
import Link from "@/components/ui/Link"

type Props = {
  filledCart?: boolean
}

const Header = (props: Props) => {
  const { filledCart = false } = props
  const [displayMenu, setDisplayMenu] = useState(false)
  const handleMenu = () => {
    setDisplayMenu(!displayMenu)
  }

  return (
    <header className="sticky top-0 bg-background w-full border-b z-10">
      <div className="flex justify-between items-center w-full px-4 py-2">
        <h1 className="font-bold text-xl">ÀIRNEIS</h1>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Search className="hover:cursor-pointer" />
            </li>
            <li className="relative">
              <Link href={"/cart"}>
                <ShoppingCart />
                {filledCart && (
                  <div className="absolute top-0 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
                )}
              </Link>
            </li>
            <li>
              {displayMenu ? (
                <X className="hover:cursor-pointer" onClick={handleMenu} />
              ) : (
                <MenuIcon
                  className="hover:cursor-pointer"
                  onClick={handleMenu}
                />
              )}
            </li>
          </ul>
        </nav>
      </div>
      {displayMenu && <Menu />}
    </header>
  )
}

export default Header
