const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

type Entry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, Entry>();

function now() {
  return Date.now();
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  return realIp ?? "anonymous";
}

export function checkRateLimit(request: Request) {
  const ip = getClientIp(request);
  const current = store.get(ip);
  const currentTime = now();

  if (!current || current.resetAt <= currentTime) {
    store.set(ip, { count: 1, resetAt: currentTime + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (current.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, retryAfter: Math.ceil((current.resetAt - currentTime) / 1000) };
  }

  current.count += 1;
  store.set(ip, current);
  return { allowed: true, remaining: MAX_REQUESTS - current.count };
}
