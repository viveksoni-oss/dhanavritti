import { NextResponse } from "next/server";

// In-memory store: Map<ip, { count, resetAt }>
// Works across requests in the same serverless instance.
// For multi-instance production deploy, swap this Map for Vercel KV:
//   import { kv } from "@vercel/kv";
const store = new Map();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;            // per IP per hour

function getIP(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function middleware(request) {
  // Only rate-limit the apply API endpoint
  if (!request.nextUrl.pathname.startsWith("/api/apply")) {
    return NextResponse.next();
  }

  const ip = getIP(request);
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    // First request in this window
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return NextResponse.next();
  }

  if (entry.count >= MAX_REQUESTS) {
    const retryAfterSecs = Math.ceil((entry.resetAt - now) / 1000);
    return new NextResponse(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(retryAfterSecs),
          "X-RateLimit-Limit": String(MAX_REQUESTS),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(entry.resetAt / 1000)),
        },
      }
    );
  }

  // Increment and allow
  entry.count += 1;
  store.set(ip, entry);

  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Limit", String(MAX_REQUESTS));
  response.headers.set("X-RateLimit-Remaining", String(MAX_REQUESTS - entry.count));
  return response;
}

export const config = {
  matcher: "/api/apply",
};
