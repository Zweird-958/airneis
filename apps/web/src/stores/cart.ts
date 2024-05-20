import { create } from "zustand"

import { ProductDetails } from "@airneis/types"

type Cart = {
  product: ProductDetails
  quantity: number
}[]

type CartStore = {
  cart: Cart | null
  setCart: (cart: Cart | null) => void
  addToCart: (product: ProductDetails, quantity: number) => void
}

const useCartStore = create<CartStore>((set) => ({
  cart: null,
  setCart: (cart) => set({ cart }),
  addToCart: (product, quantity) =>
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
          cart: cart.map(({ product: { id } }) => {
            if (id === product.id) {
              return {
                product,
                quantity: productInCart.quantity + quantity,
              }
            }

            return { product, quantity }
          }),
        }
      }

      return { ...state, cart: [...cart, { product, quantity }] }
    }),
}))

export default useCartStore
