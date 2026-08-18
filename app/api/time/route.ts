import { NextResponse } from "next/server";

// Force dynamic to ensure this is never cached
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);

  return NextResponse.json({
    message: "Hello from the SSR API route!",
    timestamp: new Date().toISOString(),
    randomNumber: Math.random(),
    requestUrl: url.pathname,
    headers: {
      host: request.headers.get("host"),
      "x-forwarded-for": request.headers.get("x-forwarded-for"),
      "user-agent": request.headers.get("user-agent"),
    },
    note: "If timestamp changes on each request, API route compute is working correctly.",
  });
}
