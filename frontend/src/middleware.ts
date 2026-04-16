import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET 
);

// Routes that require authentication but any valid role
const AUTH_ROUTES = [
  '/office',
  '/profile',
  '/applications',
  '/notifications',
  '/explore',
  '/categories',
  '/campus',
  '/download',
  '/help',
  '/rate-us',
  '/referrals',
  '/report',
  '/training',
  '/onboarding',
];

// Routes that require Admin role
const ADMIN_ROUTES = ['/admin'];

// Auth pages (redirect if already logged in)
const PUBLIC_AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // 1. Check if the route is protected
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route)) || isAdminRoute;
  const isPublicAuthRoute = PUBLIC_AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (!isAuthRoute && !isPublicAuthRoute) {
    return NextResponse.next();
  }

  // 2. Validate Token if present
  let decoded: { id: string; role: string } | null = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      decoded = payload as { id: string; role: string };
    } catch (err) {
      console.error('Middleware JWT Error:', err);
      // If token is invalid, clear it and redirect to login if it's an auth route
      if (isAuthRoute) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('token');
        return response;
      }
    }
  }

  // 3. Handle Route Logic
  
  // If authenticated and trying to access login/register
  if (decoded && isPublicAuthRoute) {
    const dashboard = decoded.role === 'Admin' ? '/admin' : '/office';
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  // If not authenticated and trying to access protected routes
  if (!decoded && isAuthRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If authenticated but not Admin and trying to access admin routes
  if (decoded && decoded.role !== 'Admin' && isAdminRoute) {
     return NextResponse.redirect(new URL('/office', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - uploads (backend uploads)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|uploads).*)',
  ],
};
