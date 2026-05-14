import { NextResponse } from "next/server";

// Temporarily disable Clerk middleware to allow local dev to start
export default function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:path*",
  ],
};
