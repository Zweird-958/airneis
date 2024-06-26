"use client"

import { MenuIcon, Search, ShoppingCart, X } from "lucide-react"
import { useState } from "react"

import Menu from "@/components/Menu"
import Link from "@/components/ui/Link"
import useCart from "@/hooks/useCart"
import useSearch from "@/hooks/useSearch"

const Header = () => {
  const [displayMenu, setDisplayMenu] = useState(false)
  const handleMenu = () => {
    setDisplayMenu(!displayMenu)
  }
  const { cart } = useCart()
  const { handleSearch } = useSearch()

  return (
    <header className="sticky top-0 bg-background w-full border-b z-10">
      <div className="flex justify-between items-center w-full px-4 py-2">
        <h1 className="font-bold text-xl">ÀIRNEIS</h1>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Search className="hover:cursor-pointer" onClick={handleSearch} />
            </li>
            <li className="relative">
              <Link href={"/checkout/cart"}>
                <ShoppingCart />
                {cart && cart.length > 0 && (
                  <div className="absolute top-0 -right-1 w-2.5 h-2.5 bg-primary rounded-full" />
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
