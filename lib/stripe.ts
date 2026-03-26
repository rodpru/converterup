import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia",
    });
  }
  return stripeInstance;
}

export const SUBSCRIPTION_PRICE_ID = process.env.STRIPE_PRICE_UNLIMITED ?? "";
export const SUBSCRIPTION_AMOUNT = 500; // $5.00 in cents
