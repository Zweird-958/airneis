"use client"

import { useRouter } from "next/navigation"

import Button from "@/components/ui/Button"
import api from "@/trpc/client"

const StripeShowcase = () => {
  const { mutateAsync } = api.checkout.createSession.useMutation()
  const router = useRouter()
  const handleClick = async () => {
    const url = await mutateAsync()

    router.push(url)
  }

  return <Button onClick={handleClick}>Create Checkout Session</Button>
}

export default StripeShowcase
