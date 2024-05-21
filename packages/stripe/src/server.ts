import Stripe from "stripe"

import env from "./env"

export const stripeServer = new Stripe(env.STRIPE_SECRET_KEY)
