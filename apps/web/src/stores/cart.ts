import { create } from "zustand"

import { Product } from "@airneis/types"

type Cart = {
  product: Product
  quantity: number
}[]

type CartStore = {
  cart: Cart | null
  setCart: (cart: Cart | null) => void
  addToCart: (product: Product, quantity: number) => void
}

const useCartStore = create<CartStore>((set) => ({
  cart: null,
  setCart: (cart) => set({ cart }),
  addToCart: (product: Product, quantity: number) =>
    set(({ cart, ...state }) => {
      if (!cart) {
        return { ...state, cart: [{ product, quantity }] }
      }

      const productInCart = cart.find(
        ({ product: { id } }) => id === product.id,
      )

      if (productInCart) {
        return {
          ...state,
          cart: cart.map((item) => {
            if (item.product.id === product.id) {
              return {
                ...item,
                quantity: item.quantity + quantity,
              }
            }

            return item
          }),
        }
      }

      return { ...state, cart: [...cart, { product, quantity }] }
    }),
}))

export default useCartStore
