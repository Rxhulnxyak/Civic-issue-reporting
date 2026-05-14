type Window = {
  windowMs: number; // time window in ms
  max: number; // max requests per window
};

const ipStore = new Map<string, number[]>();

export function rateLimitByIp(ip: string, { windowMs, max }: Window) {
  const now = Date.now();
  const windowStart = now - windowMs;

  const timestamps = (ipStore.get(ip) || []).filter((t) => t > windowStart);
  if (timestamps.length >= max) {
    return { allowed: false, remaining: 0, resetInMs: timestamps[0] + windowMs - now };
  }

  timestamps.push(now);
  ipStore.set(ip, timestamps);
  return { allowed: true, remaining: Math.max(0, max - timestamps.length), resetInMs: timestamps[0] ? timestamps[0] + windowMs - now : windowMs };
}

export function getClientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    // Use first IP in x-forwarded-for list
    return xff.split(",")[0].trim();
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
