import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { toolName, eventType } = await request.json();

  if (!toolName || !eventType) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!["started", "completed"].includes(eventType)) {
    return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
  }

  await supabase.from("tool_events").insert({
    user_id: user.id,
    tool_name: toolName,
    event_type: eventType,
  });

  return NextResponse.json({ ok: true });
}
