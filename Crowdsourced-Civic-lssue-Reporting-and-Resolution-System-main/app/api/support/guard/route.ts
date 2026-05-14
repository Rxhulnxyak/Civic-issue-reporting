import { NextResponse } from "next/server";
import { getClientIp, rateLimitByIp } from "@/lib/rate-limit";

// This endpoint enforces per-IP throttling before allowing client-side EmailJS sends.
// Returns 200 when allowed; 429 when rate limit is exceeded.
export async function POST(req: Request) {
  const ip = getClientIp(req.headers);
  const rl = rateLimitByIp(ip, { windowMs: 10 * 60 * 1000, max: 5 }); // 5 requests / 10 minutes
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later.", resetInMs: rl.resetInMs },
      { status: 429 }
    );
  }
  return NextResponse.json({ ok: true });
}
