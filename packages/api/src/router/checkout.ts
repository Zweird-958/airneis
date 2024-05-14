import { TRPCError } from "@trpc/server"

import { getBaseUrl } from "@airneis/config"

import config from "../config"
import { authedProcedure, createTRPCRouter } from "../trpc"

const checkoutRouter = createTRPCRouter({
  createSession: authedProcedure.mutation(
    async ({ ctx: { stripe, lang, entities } }) => {
      const product = await entities.product.findOne(
        { stock: { $gt: 1 } },
        { populate: ["images"] },
      )
      const quantity = 2

      if (!product) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No products available",
        })
      }

      const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            quantity,
            price_data: {
              currency: config.currency,
              product_data: {
                name: product.name[lang],
                description: product.description[lang],
                images: product.images.map((image) => image.url),
              },
              unit_amount: product.price,
            },
          },
        ],
        success_url: `${getBaseUrl()}/${lang}/result?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${getBaseUrl()}/${lang}/result?sessionId={CHECKOUT_SESSION_ID}`,
      })

      if (!checkoutSession.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create checkout session",
        })
      }

      return checkoutSession.url
    },
  ),
})

export default checkoutRouter
