import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Read auth token from cookies
  const token = request.cookies.get('auth_token')?.value;

  const { pathname } = request.nextUrl;

  // Define public auth routes (should NOT be accessible if logged in)
  const isPublicAuthRoute = pathname === '/login' || pathname === '/signup';

  // Define protected routes (MUST be logged in to access)
  const isProtectedRoute = pathname.startsWith('/dashboard');

  // 1. If user is logged in and tries to access /login or /signup -> redirect to dashboard
  if (isPublicAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. If user is NOT logged in and tries to access /dashboard -> redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Ensure middleware only fires on specific routes
export const config = {
  matcher: ['/login', '/signup', '/dashboard/:path*'],
};
