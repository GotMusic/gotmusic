import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// ✅ Only run on /console and /console/*
export const config = { matcher: ['/console', '/console/:path*'] }

export function middleware(req: NextRequest) {
  // 🔒 Session check for Console routes
  const hasSession = Boolean(req.cookies.get('session')?.value)

  if (!hasSession) {
    const url = new URL('/shop', req.url)
    url.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search)
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}