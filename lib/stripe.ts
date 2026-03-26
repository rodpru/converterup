import Stripe from "stripe";

const isProduction = process.env.NODE_ENV === "production";

const STRIPE_SECRET = isProduction
  ? process.env.STRIPE_SECRET_KEY!
  : process.env.STRIPE_TEST_SECRET_KEY!;

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(STRIPE_SECRET, {
      apiVersion: "2025-02-24.acacia",
    });
  }
  return stripeInstance;
}

export const SUBSCRIPTION_PRICE_ID = isProduction
  ? (process.env.STRIPE_PRICE_UNLIMITED ?? "")
  : (process.env.STRIPE_TEST_PRICE_UNLIMITED ?? "");

export const STRIPE_WEBHOOK_SECRET = isProduction
  ? process.env.STRIPE_WEBHOOK_SECRET!
  : process.env.STRIPE_TEST_WEBHOOK_SECRET!;

export const SUBSCRIPTION_AMOUNT = 500; // $5.00 in cents
