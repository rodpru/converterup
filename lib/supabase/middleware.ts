import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

/**
 * Runs Supabase auth session refresh and merges resulting Set-Cookie headers
 * onto an existing response (e.g. the one produced by next-intl middleware).
 * Returns a redirect response if the user is unauthenticated on a protected route.
 */
export async function updateSession(
  request: NextRequest,
  response: NextResponse,
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: {
          name: string;
          value: string;
          options?: Record<string, unknown>;
        }[],
      ) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Extract locale from pathname for locale-aware redirects
  const pathname = request.nextUrl.pathname;
  let locale = routing.defaultLocale;
  for (const loc of routing.locales) {
    if (pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`) {
      locale = loc;
      break;
    }
  }

  // Redirect to login if accessing dashboard without auth
  const isDashboard =
    pathname.startsWith("/dashboard") ||
    routing.locales.some(
      (loc) =>
        pathname.startsWith(`/${loc}/dashboard`) ||
        pathname === `/${loc}/dashboard`,
    );

  if (!user && isDashboard) {
    const url = request.nextUrl.clone();
    url.pathname =
      locale === routing.defaultLocale ? "/login" : `/${locale}/login`;
    return NextResponse.redirect(url);
  }

  return response;
}
