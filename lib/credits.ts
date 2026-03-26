import { createClient } from "@/lib/supabase/server";

export interface UserStatus {
  canConvert: boolean;
  isSubscriber: boolean;
  dailyUsed: number;
  dailyLimit: number;
  subscriptionStatus: string;
}

function isToday(dateStr: string): boolean {
  const d = new Date(dateStr);
  const now = new Date();
  return d.getUTCFullYear() === now.getUTCFullYear() &&
    d.getUTCMonth() === now.getUTCMonth() &&
    d.getUTCDate() === now.getUTCDate();
}

export async function getUserStatus(userId: string): Promise<UserStatus | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("daily_conversions, last_conversion_date, subscription_status, subscription_end")
    .eq("id", userId)
    .single();

  if (error || !data) return null;

  const isSubscriber = data.subscription_status === "active" &&
    (!data.subscription_end || new Date(data.subscription_end) > new Date());

  // Reset daily counter if new day
  let dailyUsed = data.daily_conversions;
  if (!isToday(data.last_conversion_date)) {
    dailyUsed = 0;
    await supabase
      .from("profiles")
      .update({ daily_conversions: 0, last_conversion_date: new Date().toISOString().split("T")[0] })
      .eq("id", userId);
  }

  const dailyLimit = 3;
  const canConvert = isSubscriber || dailyUsed < dailyLimit;

  return {
    canConvert,
    isSubscriber,
    dailyUsed,
    dailyLimit,
    subscriptionStatus: data.subscription_status,
  };
}

export async function useConversion(userId: string): Promise<{ success: boolean; status: UserStatus | null }> {
  const status = await getUserStatus(userId);
  if (!status || !status.canConvert) return { success: false, status };

  const supabase = await createClient();

  if (!status.isSubscriber) {
    // Increment daily counter for free users
    const { data: profile } = await supabase
      .from("profiles")
      .select("total_conversions")
      .eq("id", userId)
      .single();

    await supabase
      .from("profiles")
      .update({
        daily_conversions: status.dailyUsed + 1,
        last_conversion_date: new Date().toISOString().split("T")[0],
        total_conversions: (profile?.total_conversions ?? 0) + 1,
      })
      .eq("id", userId);
  } else {
    // Subscriber: just increment total
    const { data: profile } = await supabase
      .from("profiles")
      .select("total_conversions")
      .eq("id", userId)
      .single();

    await supabase
      .from("profiles")
      .update({
        total_conversions: (profile?.total_conversions ?? 0) + 1,
      })
      .eq("id", userId);
  }

  return { success: true, status: await getUserStatus(userId) };
}

export async function logConversion(
  userId: string,
  details: {
    inputFormat: string;
    outputFormat: string;
    inputSize: number;
    outputSize?: number;
    durationMs?: number;
    conversionType?: string;
  },
): Promise<void> {
  const supabase = await createClient();
  await supabase.from("conversions").insert({
    user_id: userId,
    input_format: details.inputFormat,
    output_format: details.outputFormat,
    input_size: details.inputSize,
    output_size: details.outputSize ?? null,
    duration_ms: details.durationMs ?? null,
    conversion_type: details.conversionType ?? "format",
    status: "completed",
  });
}

export async function activateSubscription(
  userId: string,
  stripeCustomerId: string,
  stripeSubscriptionId: string,
): Promise<void> {
  const supabase = await createClient();
  await supabase
    .from("profiles")
    .update({
      subscription_status: "active",
      stripe_customer_id: stripeCustomerId,
      stripe_subscription_id: stripeSubscriptionId,
      subscription_start: new Date().toISOString(),
    })
    .eq("id", userId);
}

export async function cancelSubscription(userId: string): Promise<void> {
  const supabase = await createClient();
  await supabase
    .from("profiles")
    .update({
      subscription_status: "cancelled",
      subscription_end: new Date().toISOString(),
    })
    .eq("id", userId);
}
