import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/en/youtube-thumbnail-downloader") {
    return NextResponse.redirect(
      new URL("/tools/youtube-thumbnail-downloader", request.url),
      301,
    );
  }

  const response = await updateSession(request);

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
