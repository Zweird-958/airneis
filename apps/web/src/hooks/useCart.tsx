import { useEffect } from "react"

import { Product } from "@airneis/types"

import useErrorHandler from "@/hooks/useErrorHandler"
import useSession from "@/hooks/useSession"
import useCartStore from "@/stores/cart"
import api from "@/trpc/client"
import config from "@/utils/config"

const useApiCart = () => {
  const { onError } = useErrorHandler()
  const { data: cartData, refetch: refetchCart } = api.carts.get.useQuery()
  const { mutate: addMutate } = api.carts.add.useMutation({ onError })
  const { mutate: updateMutate } = api.carts.update.useMutation({
    onError,
    onSuccess: () => refetchCart(),
  })

  return { cartData, addMutate, updateMutate }
}
const useCart = () => {
  const { session } = useSession()
  const { cart, setCart, addToCart, updateQuantity } = useCartStore()
  const { cartData, addMutate, updateMutate } = useApiCart()
  const handleAdd = (productId: Product["id"], quantity = 1) => {
    if (session) {
      addMutate(
        { productId, quantity },
        { onSuccess: () => addToCart(productId, quantity) },
      )

      return
    }

    addToCart(productId, quantity)
    addToLocalStorage(cart)
  }
  const addToLocalStorage = (localCart: typeof cart) => {
    localStorage.setItem(config.cart.localStorageKey, JSON.stringify(localCart))
  }
  const handleUpdate = (productId: Product["id"], quantity: number) => {
    if (session) {
      updateMutate(
        { productId, quantity },
        { onSuccess: () => updateQuantity(productId, quantity) },
      )

      return
    }

    updateQuantity(productId, quantity)
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

  return { cart, addToCart: handleAdd, updateQuantity: handleUpdate }
}

export default useCart
