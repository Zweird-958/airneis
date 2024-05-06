import { useEffect } from "react"

import useErrorHandler from "@/hooks/useErrorHandler"
import useSession from "@/hooks/useSession"
import useCartStore from "@/stores/cart"
import api from "@/trpc/client"
import config from "@/utils/config"

const useCart = () => {
  const { onError } = useErrorHandler()
  const { session } = useSession()
  const { data: cartData } = api.carts.get.useQuery()
  const { mutate } = api.carts.addToCart.useMutation({ onError })
  const { cart, setCart, addToCart } = useCartStore()
  const handleAddToCart = (productId: string, quantity: number = 1) => {
    if (session) {
      mutate(
        { productId, quantity },
        { onSuccess: () => addToCart(productId, quantity) },
      )

      return
    }

    addToCart(productId, quantity)
    addToLocalStorage(cart)
  }
  const addToLocalStorage = (localCart: typeof cart) => {
    if (session) {
      return
    }

    localStorage.setItem(config.cart.localStorageKey, JSON.stringify(localCart))
  }

  useEffect(() => {
    if (session) {
      if (cartData) {
        setCart(cartData)
      }

      return
    }

    if (cart) {
      localStorage.setItem(config.cart.localStorageKey, JSON.stringify(cart))

      return
    }

    const localCart = localStorage.getItem(config.cart.localStorageKey)

    if (localCart) {
      setCart(JSON.parse(localCart))
    }
  }, [cart, cartData, session, setCart])

  return { cart, addToCart: handleAddToCart }
}

export default useCart
