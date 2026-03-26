import { createClient } from "@/lib/supabase/server";
import { getStripe, SUBSCRIPTION_PRICE_ID } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price: SUBSCRIPTION_PRICE_ID, quantity: 1 }],
    mode: "subscription",
    success_url: `${request.headers.get("origin")}/dashboard?upgraded=true`,
    cancel_url: `${request.headers.get("origin")}/dashboard`,
    metadata: { userId: user.id },
    customer_email: user.email,
  });

  return NextResponse.json({ url: session.url });
}
