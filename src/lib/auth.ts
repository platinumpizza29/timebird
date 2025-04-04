import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "~/server/db";
import { stripe } from "@better-auth/stripe";
import Stripe from "stripe";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
    }),
  ],
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  subscription: {
    enabled: true,
    plans: [
      {
        name: "basic", // the name of the plan, it'll be automatically lower cased when stored in the database
        priceId: "prod_S38gbyQfd9wb0Q", // the price id of the plan in stripe
      },
      {
        name: "pro",
        priceId: "prod_S38heYE0VpUqe1",
        limits: {
          projects: 20,
          storage: 50,
        },
        freeTrial: {
          days: 14,
        },
      },
    ],
  },
});
