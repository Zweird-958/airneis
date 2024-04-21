"use client"

import { Stripe } from "@stripe/stripe-js"
import { loadStripe } from "@stripe/stripe-js/pure"

import env from "../env"

/**
 * Recommended pattern for initializing Stripe.js
 *
 * See: https://vercel.com/guides/getting-started-with-nextjs-typescript-stripe
 */

// eslint-disable-next-line init-declarations
let stripePromise: Promise<Stripe | null>
export const getStripe = () => {
  stripePromise ||= loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

  return stripePromise
}
