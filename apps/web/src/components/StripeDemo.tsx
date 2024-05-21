"use client"

import { useRouter } from "next/navigation"

import Button from "@/components/ui/Button"
import useErrorHandler from "@/hooks/useErrorHandler"
import api from "@/trpc/client"

const StripeShowcase = () => {
  const { onError } = useErrorHandler()
  const { mutate } = api.checkout.createSession.useMutation({
    onError,
    onSuccess: (url) => {
      router.push(url)
    },
  })
  const router = useRouter()
  const handleClick = () => {
    mutate()
  }

  return <Button onClick={handleClick}>Create Checkout Session</Button>
}

export default StripeShowcase
