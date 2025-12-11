import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

// Routes that don't require authentication
const publicRoutes = ['/api/auth'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow all auth routes and public API routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get session
  const session = await auth();

  // Redirect to sign in if not authenticated
  if (!session) {
    return NextResponse.redirect(new URL('/api/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect all routes except static files and auth routes
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
