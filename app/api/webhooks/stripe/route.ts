import { getStripe } from "@/lib/stripe";
import { activateSubscription, cancelSubscription } from "@/lib/credits";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = getStripe();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { metadata?: { userId?: string }; customer?: string; subscription?: string };
    const userId = session.metadata?.userId;
    if (userId && session.customer && session.subscription) {
      await activateSubscription(userId, session.customer as string, session.subscription as string);
      // Log subscription event
      const supabase = await createClient();
      await supabase.from("subscription_events").insert({
        user_id: userId,
        event_type: "subscribed",
        stripe_event_id: event.id,
        amount: 500,
      });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as { metadata?: { userId?: string } };
    const userId = subscription.metadata?.userId;
    if (userId) {
      await cancelSubscription(userId);
      const supabase = await createClient();
      await supabase.from("subscription_events").insert({
        user_id: userId,
        event_type: "cancelled",
        stripe_event_id: event.id,
        amount: 0,
      });
    }
  }

  return NextResponse.json({ received: true });
}
