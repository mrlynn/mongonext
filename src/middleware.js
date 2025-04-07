/**
 * @file Next.js middleware for authentication and route protection
 * @module middleware
 */

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * Middleware function for protecting routes and handling authentication
 * 
 * @async
 * @function middleware
 * @param {Request} request - The incoming request
 * @returns {Promise<NextResponse>} The response (redirect or continue)
 */
export async function middleware(request) {
  // Check if authentication is required
  const authRequired = process.env.AUTH_REQUIRED !== 'false';
  
  // If authentication is not required, allow all requests
  if (!authRequired) {
    return NextResponse.next();
  }

  // Get the pathname from the URL
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth/signin' || 
                      path === '/auth/signup' || 
                      path === '/auth/forgot-password' ||
                      path === '/auth/reset-password' ||
                      path === '/auth/verify-email' ||
                      path === '/api/auth/register' ||
                      path.startsWith('/api/auth/');
  
  // Define admin paths that require admin role
  const isAdminPath = path.startsWith('/admin') || path.startsWith('/api/admin');
  
  // Get the authentication token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  // If user is authenticated and tries to access auth pages, redirect to dashboard
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Handle public paths - always allow
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // Handle access to protected routes
  if (!token) {
    const url = new URL('/auth/signin', request.url);
    url.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(url);
  }
  
  // Check admin access
  if (isAdminPath && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Allow access to protected routes
  return NextResponse.next();
}

/**
 * Configure which routes should use this middleware
 */
export const config = {
  matcher: [
    // Protected routes
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/users/:path*',
    // Auth routes
    '/auth/:path*',
  ],
};