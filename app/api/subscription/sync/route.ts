import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripe = getStripe();

  // Find customer by email
  const customers = await stripe.customers.list({
    email: user.email,
    limit: 1,
  });

  if (customers.data.length === 0) {
    return NextResponse.json({ subscribed: false });
  }

  const customer = customers.data[0];

  // Check active subscriptions
  const subscriptions = await stripe.subscriptions.list({
    customer: customer.id,
    status: "active",
    limit: 1,
  });

  if (subscriptions.data.length === 0) {
    return NextResponse.json({ subscribed: false });
  }

  const subscription = subscriptions.data[0];

  // Update profile
  await supabase
    .from("profiles")
    .update({
      subscription_status: "active",
      stripe_customer_id: customer.id,
      stripe_subscription_id: subscription.id,
      subscription_start: new Date(
        subscription.start_date * 1000,
      ).toISOString(),
    })
    .eq("id", user.id);

  return NextResponse.json({ subscribed: true });
}
