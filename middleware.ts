import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Safely initialize the Redis client and Ratelimit
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

let ratelimit: Ratelimit | null = null;

if (url && token) {
  const redis = new Redis({ url, token });
  ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(20, '10 s'),
    analytics: true,
  });
}

export async function middleware(request: NextRequest) {
  // If env variables are missing, bypass rate limiting instead of crashing
  if (!ratelimit) {
    return NextResponse.next();
  }

  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';

    // Apply rate limiting
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    // Return a 429 Too Many Requests response if the limit is exceeded
    if (!success) {
      return new NextResponse('Too Many Requests / Trop de requêtes', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      });
    }

    // Continue to the requested route
    const res = NextResponse.next();
    
    // Optionally, add rate limit info to headers on successful requests
    res.headers.set('X-RateLimit-Limit', limit.toString());
    res.headers.set('X-RateLimit-Remaining', remaining.toString());
    res.headers.set('X-RateLimit-Reset', reset.toString());

    return res;
  } catch (error) {
    console.error('Rate limiting error:', error);
    // In case of any error with Redis, let the user access the site to avoid downtime
    return NextResponse.next();
  }
}

// Matcher to apply rate limiting to routes, avoiding static assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/webhooks (if any webhooks need bypass)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (e.g. svg, png, jpg)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
