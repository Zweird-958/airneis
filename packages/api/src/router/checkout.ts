import { TRPCError } from "@trpc/server"

import config from "../config"
import withOrigin from "../middlewares/withOrigin"
import { authedProcedure, createTRPCRouter } from "../trpc"

const checkoutRouter = createTRPCRouter({
  createSession: authedProcedure
    .use(withOrigin)
    .mutation(async ({ ctx: { stripe, lang, origin } }) => {
      const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            quantity: 2,
            price_data: {
              currency: config.currency.toLowerCase(),
              product_data: { name: "Table" },
              unit_amount: 2000,
            },
          },
        ],
        success_url: `${origin}/${lang}/result?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/${lang}/result?sessionId={CHECKOUT_SESSION_ID}`,
      })

      if (!checkoutSession.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create checkout session",
        })
      }

      return checkoutSession.url
    }),
})

export default checkoutRouter
