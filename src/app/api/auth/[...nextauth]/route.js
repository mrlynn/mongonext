/**
 * @file NextAuth.js API route
 * @module app/api/auth/[...nextauth]
 */

import NextAuth from 'next-auth';
import authOptions from '@/lib/auth/config';

/**
 * NextAuth.js handler for authentication
 * This handles all authentication-related routes:
 * - /api/auth/signin
 * - /api/auth/callback
 * - /api/auth/signout
 * - /api/auth/session
 * - /api/auth/csrf
 * - /api/auth/providers
 * 
 * @type {import('next-auth').NextAuthHandler}
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };