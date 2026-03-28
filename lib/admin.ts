import { createClient } from "@/lib/supabase/server";

export async function isAdmin(userId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();
  return data?.role === "boss";
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ActivityItem {
  timestamp: string;
  email: string;
  action: "signup" | "conversion" | "upgrade" | "cancel";
  detail: string;
}

export interface OverviewData {
  totalUsers: number;
  activeSubscribers: number;
  totalConversions: number;
  revenue: number;
  recentActivity: ActivityItem[];
}

export interface ProfileRow {
  id: string;
  email: string;
  role: string;
  daily_conversions: number;
  last_conversion_date: string;
  subscription_status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_start: string | null;
  subscription_end: string | null;
  total_conversions: number;
  total_paid: number;
  created_at: string;
  updated_at: string;
}

export interface ConversionRow {
  id: string;
  user_id: string;
  input_format: string;
  output_format: string;
  input_size: number;
  output_size: number | null;
  duration_ms: number | null;
  conversion_type: string;
  status: string;
  created_at: string;
  user_email?: string;
}

export interface RevenueData {
  mrr: number;
  totalRevenue: number;
  activeSubscribers: number;
  churnRate: number;
  arpu: number;
  ltv: number;
  transactions: {
    id: string;
    email: string;
    event_type: string;
    amount: number;
    created_at: string;
  }[];
}

export interface ToolStat {
  toolName: string;
  started: number;
  completed: number;
  conversionRate: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const IMAGE_FORMATS = [
  "png",
  "jpg",
  "jpeg",
  "webp",
  "avif",
  "gif",
  "tiff",
  "bmp",
];
const VIDEO_FORMATS = ["mp4", "webm", "mkv", "avi", "mov"];
const AUDIO_FORMATS = ["mp3", "aac", "wav", "ogg"];

// ---------------------------------------------------------------------------
// getOverviewData
// ---------------------------------------------------------------------------

export async function getOverviewData(): Promise<OverviewData> {
  const supabase = await createClient();

  // Run queries in parallel
  const [
    usersRes,
    activeSubsRes,
    conversionsRes,
    revenueRes,
    recentSubEventsRes,
    recentConversionsRes,
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("subscription_status", "active"),
    supabase.from("conversions").select("*", { count: "exact", head: true }),
    supabase
      .from("subscription_events")
      .select("amount")
      .eq("event_type", "subscribed"),
    supabase
      .from("subscription_events")
      .select("event_type, amount, created_at, user_id, profiles(email)")
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("conversions")
      .select(
        "input_format, output_format, created_at, user_id, profiles(email)",
      )
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const totalUsers = usersRes.count ?? 0;
  const activeSubscribers = activeSubsRes.count ?? 0;
  const totalConversions = conversionsRes.count ?? 0;

  const revenue = (revenueRes.data ?? []).reduce(
    (sum, e) => sum + (e.amount ?? 0),
    0,
  );

  // Merge recent activity from subscription_events and conversions
  type SubEvent = {
    event_type: string;
    amount: number | null;
    created_at: string;
    user_id: string;
    profiles: Record<string, unknown> | Record<string, unknown>[] | null;
  };
  type ConvEvent = {
    input_format: string;
    output_format: string;
    created_at: string;
    user_id: string;
    profiles: Record<string, unknown> | Record<string, unknown>[] | null;
  };

  type ActivityWithDate = ActivityItem & { _date: string };

  const subActivities: ActivityWithDate[] = (
    (recentSubEventsRes.data ?? []) as SubEvent[]
  ).map((e) => {
    const email = e.profiles
      ? Array.isArray(e.profiles)
        ? ((e.profiles[0]?.email as string) ?? "unknown")
        : (((e.profiles as Record<string, unknown>).email as string) ??
          "unknown")
      : "unknown";
    let action: ActivityItem["action"] = "signup";
    let detail = "";
    if (e.event_type === "subscribed") {
      action = "upgrade";
      detail = `Subscribed — $${((e.amount ?? 0) / 100).toFixed(2)}`;
    } else if (e.event_type === "cancelled") {
      action = "cancel";
      detail = "Subscription cancelled";
    } else {
      detail = e.event_type;
    }
    return {
      timestamp: timeAgo(e.created_at),
      email,
      action,
      detail,
      _date: e.created_at,
    };
  });

  const convActivities: ActivityWithDate[] = (
    (recentConversionsRes.data ?? []) as ConvEvent[]
  ).map((e) => {
    const email = e.profiles
      ? Array.isArray(e.profiles)
        ? ((e.profiles[0]?.email as string) ?? "unknown")
        : (((e.profiles as Record<string, unknown>).email as string) ??
          "unknown")
      : "unknown";
    return {
      timestamp: timeAgo(e.created_at),
      email,
      action: "conversion" as const,
      detail: `${e.input_format.toUpperCase()} → ${e.output_format.toUpperCase()}`,
      _date: e.created_at,
    };
  });

  // Merge and sort by actual date descending, take first 10
  const allActivity: ActivityItem[] = [...subActivities, ...convActivities]
    .sort((a, b) => new Date(b._date).getTime() - new Date(a._date).getTime())
    .slice(0, 10)
    .map(({ _date: _, ...item }) => item);

  return {
    totalUsers,
    activeSubscribers,
    totalConversions,
    revenue,
    recentActivity: allActivity,
  };
}

// ---------------------------------------------------------------------------
// getUsers
// ---------------------------------------------------------------------------

export async function getUsers(options?: {
  filter?: "all" | "free" | "active" | "cancelled";
  search?: string;
  page?: number;
  limit?: number;
}) {
  const supabase = await createClient();
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 25;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (options?.filter && options.filter !== "all") {
    query = query.eq("subscription_status", options.filter);
  }

  if (options?.search) {
    query = query.ilike("email", `%${options.search}%`);
  }

  const { data, count, error } = await query;

  if (error) {
    console.error("getUsers error:", error.message);
  }

  return {
    users: (data ?? []) as ProfileRow[],
    total: count ?? 0,
    page,
    limit,
  };
}

// ---------------------------------------------------------------------------
// getConversions
// ---------------------------------------------------------------------------

export async function getConversions(options?: {
  type?: "all" | "images" | "videos" | "audio";
  search?: string;
  page?: number;
  limit?: number;
}) {
  const supabase = await createClient();
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 25;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("conversions")
    .select("*, profiles(email)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  // Type filter by input_format
  if (options?.type === "images") {
    query = query.in("input_format", IMAGE_FORMATS);
  } else if (options?.type === "videos") {
    query = query.in("input_format", VIDEO_FORMATS);
  } else if (options?.type === "audio") {
    query = query.in("input_format", AUDIO_FORMATS);
  }

  if (options?.search) {
    // Search by format — email search requires a join filter which Supabase
    // doesn't support directly via ilike on a joined column. We search both
    // input_format and output_format instead.
    query = query.or(
      `input_format.ilike.%${options.search}%,output_format.ilike.%${options.search}%`,
    );
  }

  const { data, count, error } = await query;

  if (error) {
    console.error("getConversions error:", error.message);
  }

  const conversions: ConversionRow[] = (data ?? []).map((row) => {
    const profile = row.profiles as { email: string } | null;
    return {
      id: row.id,
      user_id: row.user_id,
      input_format: row.input_format,
      output_format: row.output_format,
      input_size: row.input_size,
      output_size: row.output_size,
      duration_ms: row.duration_ms,
      conversion_type: row.conversion_type,
      status: row.status,
      created_at: row.created_at,
      user_email: profile?.email ?? "unknown",
    };
  });

  return {
    conversions,
    total: count ?? 0,
    page,
    limit,
  };
}

// ---------------------------------------------------------------------------
// getRevenue
// ---------------------------------------------------------------------------

export async function getRevenue(): Promise<RevenueData> {
  const supabase = await createClient();

  const [activeSubsRes, cancelledRes, allSubEventsRes, totalUsersRes, txRes] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("subscription_status", "active"),
      supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("subscription_status", "cancelled"),
      supabase
        .from("subscription_events")
        .select("amount")
        .eq("event_type", "subscribed"),
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase
        .from("subscription_events")
        .select("*, profiles(email)")
        .order("created_at", { ascending: false })
        .limit(50),
    ]);

  const activeSubscribers = activeSubsRes.count ?? 0;
  const cancelledCount = cancelledRes.count ?? 0;
  const totalUsers = totalUsersRes.count ?? 0;

  const totalRevenue = (allSubEventsRes.data ?? []).reduce(
    (sum, e) => sum + (e.amount ?? 0),
    0,
  );

  // MRR = active subscribers * $5 (500 cents)
  const mrr = activeSubscribers * 500;

  // Churn rate
  const totalEverSubscribed = activeSubscribers + cancelledCount;
  const churnRate =
    totalEverSubscribed > 0 ? (cancelledCount / totalEverSubscribed) * 100 : 0;

  // ARPU (in cents)
  const arpu = totalUsers > 0 ? totalRevenue / totalUsers : 0;

  // LTV
  const churnFraction = churnRate / 100;
  const ltv = churnFraction > 0 ? arpu / churnFraction : arpu;

  const transactions = (txRes.data ?? []).map((row) => {
    const profile = row.profiles as { email: string } | null;
    return {
      id: row.id as string,
      email: profile?.email ?? "unknown",
      event_type: row.event_type as string,
      amount: (row.amount ?? 0) as number,
      created_at: row.created_at as string,
    };
  });

  return {
    mrr,
    totalRevenue,
    activeSubscribers,
    churnRate: Math.round(churnRate * 100) / 100,
    arpu: Math.round(arpu),
    ltv: Math.round(ltv),
    transactions,
  };
}

// ---------------------------------------------------------------------------
// getToolStats
// ---------------------------------------------------------------------------

export async function getToolStats(): Promise<ToolStat[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tool_events")
    .select("tool_name, event_type");

  if (error) {
    console.error("getToolStats error:", error.message);
    return [];
  }

  // Group by tool_name
  const map = new Map<string, { started: number; completed: number }>();
  for (const row of data ?? []) {
    const entry = map.get(row.tool_name) ?? { started: 0, completed: 0 };
    if (row.event_type === "started") {
      entry.started++;
    } else if (row.event_type === "completed") {
      entry.completed++;
    }
    map.set(row.tool_name, entry);
  }

  const stats: ToolStat[] = [];
  for (const [toolName, counts] of map) {
    stats.push({
      toolName,
      started: counts.started,
      completed: counts.completed,
      conversionRate:
        counts.started > 0
          ? Math.round((counts.completed / counts.started) * 10000) / 100
          : 0,
    });
  }

  // Sort by started descending (most popular first)
  stats.sort((a, b) => b.started - a.started);
  return stats;
}
