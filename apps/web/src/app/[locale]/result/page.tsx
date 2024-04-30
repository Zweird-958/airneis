import { notFound } from "next/navigation"

import { stripe } from "@airneis/stripe/server"

type Props = {
  searchParams: { sessionId: string }
}

const Page = async ({ searchParams: { sessionId } }: Props) => {
  if (!sessionId) {
    notFound()
  }

  const session = await stripe.checkout.sessions
    .retrieve(sessionId)
    .catch(() => null)

  if (!session) {
    notFound()
  }

  return (
    <div>
      <p>Status: {session.status}</p>
      <p>Amount: {session.amount_total}</p>
    </div>
  )
}

export default Page
