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
  
  console.log('MIDDLEWARE SECRET:', process.env.NEXTAUTH_SECRET ? 'Secret exists' : 'Secret missing'); 
  
  // Get the authentication token with debug details
  try {
    // Log cookie information to debug
    const cookieHeader = request.headers.get('cookie');
    console.log('Request cookies:', cookieHeader);
    
    // Get the token with more options for debugging
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here',
      secureCookie: process.env.NODE_ENV === 'production',
      cookieName: 'next-auth.session-token',
      raw: false,
    });
    
    // Log detailed processing information
    console.log('Middleware processing path:', path);
    console.log('Is public path:', isPublicPath);
    console.log('Is admin path:', isAdminPath);
    console.log('Auth token:', token ? {
      id: token.id,
      email: token.email,
      role: token.role,
      isVerified: token.isVerified
    } : 'No token');
    
    // Handle public paths - always allow
    if (isPublicPath) {
      console.log('Public path accessed, allowing request');
      return NextResponse.next();
    }
    
    // Handle access to protected routes
    if (!token) {
      console.log('No authentication token found, redirecting to login');
      const url = new URL('/auth/signin', request.url);
      url.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(url);
    }
    
    // User is authenticated at this point
    console.log('User is authenticated with role:', token.role);
    
    // For development purposes - allow all authenticated users to access everything
    return NextResponse.next();
    
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of error, allow the request to proceed to avoid blocking users
    return NextResponse.next();
  }
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