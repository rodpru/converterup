import { createClient } from "@/lib/supabase/server";

export async function isAdmin(userId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();
  return data?.role === "admin";
}

export async function getOverviewData() {
  // Placeholder — will query Supabase for real metrics
  return {
    totalUsers: 0,
    activeUsers: 0,
    mrr: 0,
    conversionsToday: 0,
    recentActivity: [],
  };
}

export async function getUsers(_options?: {
  filter?: "all" | "free" | "active" | "cancelled";
  search?: string;
  page?: number;
  limit?: number;
}) {
  // Placeholder — will query Supabase profiles + subscriptions
  return {
    users: [],
    total: 0,
    page: 1,
    limit: 25,
  };
}

export async function getConversions(_options?: {
  type?: "all" | "images" | "videos" | "audio";
  search?: string;
  page?: number;
  limit?: number;
}) {
  // Placeholder — will query Supabase conversions table
  return {
    conversions: [],
    total: 0,
    page: 1,
    limit: 25,
  };
}

export async function getRevenue() {
  // Placeholder — will query Stripe + Supabase for revenue data
  return {
    mrr: 0,
    totalRevenue: 0,
    activeSubscribers: 0,
    churnRate: 0,
    arpu: 0,
    ltv: 0,
    transactions: [],
  };
}
