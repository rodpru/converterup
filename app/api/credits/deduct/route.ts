import { createClient } from "@/lib/supabase/server";
import { useConversion } from "@/lib/credits";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await useConversion(user.id);
  if (!result.success) {
    return NextResponse.json({ error: "insufficient_credits" }, { status: 403 });
  }

  return NextResponse.json(result.status);
}
