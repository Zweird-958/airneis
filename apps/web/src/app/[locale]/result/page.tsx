import { notFound } from "next/navigation"

import { stripeServer } from "@airneis/stripe"

type Props = {
  searchParams: { sessionId: string }
}

const Page = async ({ searchParams: { sessionId } }: Props) => {
  if (!sessionId) {
    notFound()
  }

  const session = await stripeServer.checkout.sessions
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
