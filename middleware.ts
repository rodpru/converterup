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

  // Add COOP/COEP headers for SharedArrayBuffer (FFmpeg multi-thread)
  // Only in production — dev turbopack worker is incompatible with COEP
  if (
    request.nextUrl.pathname === "/dashboard" &&
    process.env.NODE_ENV === "production"
  ) {
    response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
    response.headers.set("Cross-Origin-Embedder-Policy", "credentialless");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
