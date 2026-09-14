/**
 * Minimal fixed-window rate limiter.
 *
 * Deliberately in-memory: it is per server instance, so it is a speed bump
 * against casual abuse rather than a distributed guarantee. That is the right
 * trade-off for a contact form on a marketing site — no Redis to run, no
 * dependency to maintain. If the site is ever deployed across many instances
 * and form spam becomes a real problem, swap the Map for a shared store; the
 * call site does not change.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Stop the Map growing without bound on a long-running server. */
function sweep(now: number) {
  if (buckets.size < 5000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  /** Seconds until the window resets. */
  retryAfter: number;
};

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;

  if (existing.count > limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  return {
    allowed: true,
    remaining: limit - existing.count,
    retryAfter: 0,
  };
}

/**
 * Best-effort client identifier. Behind a proxy the first x-forwarded-for
 * entry is the client; without one we fall back to a shared bucket, which
 * only tightens the limit rather than loosening it.
 */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip") ?? "unknown";
}
