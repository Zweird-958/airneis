import { create } from "zustand"

import { Product } from "@airneis/types"

type Cart = {
  id: Product["id"]
  quantity: number
}[]

type CartStore = {
  cart: Cart | null
  setCart: (cart: Cart | null) => void
  addToCart: (productId: Product["id"], quantity: number) => void
}

const useCartStore = create<CartStore>((set) => ({
  cart: null,
  setCart: (cart) => set({ cart }),
  addToCart: (productId: Product["id"], quantity: number) =>
    set(({ cart, ...state }) => {
      if (!cart) {
        return { ...state, cart: [{ id: productId, quantity }] }
      }

      const productInCart = cart.find(({ id }) => id === productId)

      if (productInCart) {
        return {
          ...state,
          cart: cart.map((product) => {
            if (product.id === productId) {
              return {
                ...product,
                quantity: product.quantity + quantity,
              }
            }

            return product
          }),
        }
      }

      return { ...state, cart: [...cart, { id: productId, quantity }] }
    }),
}))

export default useCartStore
