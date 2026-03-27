import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Redirects from expired domain paths to new tool pages
  const redirects: Record<string, string> = {
    "/en/youtube-thumbnail-downloader": "/tools/youtube-thumbnail-downloader",
    "/stripe-fee-calculator": "/tools/stripe-fee-calculator",
    "/text-repeater": "/tools/text-repeater",
    "/en/blog/how-to-convert-vtt-to-srt": "/tools/vtt-to-srt",
    "/en/blog/how-to-use-json-viewer-online": "/tools/json-viewer",
    "/en/hex-to-decimal": "/tools/hex-to-decimal",
  };

  const redirect = redirects[request.nextUrl.pathname];
  if (redirect) {
    return NextResponse.redirect(new URL(redirect, request.url), 301);
  }

  const response = await updateSession(request);

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
