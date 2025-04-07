/**
 * @file NextAuth.js configuration
 * @module lib/auth/config
 */

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/user.model';
import connectDB from '@/lib/db/connect';

/**
 * NextAuth.js configuration options
 * @type {NextAuthOptions}
 */
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // Email/Password auth
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await connectDB();
        
        if (!credentials?.email || !credentials?.password) {
          console.error('Missing email or password');
          return null;
        }
        
        try {
          // Find user by email
          const user = await User.findOne({ email: credentials.email }).select('+password');
          
          if (!user) {
            console.error('User not found:', credentials.email);
            return null;
          }
          
          // Verify password
          const isValid = await user.comparePassword(credentials.password);
          
          if (!isValid) {
            console.error('Invalid password for user:', credentials.email);
            return null;
          }
          
          // Update last login timestamp
          user.lastLogin = new Date();
          await user.save();
          
          // Check if user is verified
          if (!user.isVerified) {
            console.log('User is not verified:', user.email);
            // Uncomment the line below to prevent unverified users from logging in
            // return null;
          }
          
          // Return user without password
          const userObject = user.toObject();
          delete userObject.password;
          
          console.log('User authenticated successfully:', {
            email: userObject.email,
            role: userObject.role,
            isVerified: userObject.isVerified
          });
          
          return userObject;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    }),
    // Add more providers here - Google, GitHub, etc.
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
  
  // Customize pages
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user'
  },
  
  // Callbacks
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user._id || user.id;
        token.role = user.role || 'user';
        token.isVerified = user.isVerified || false;
        
        console.log('JWT TOKEN CREATION:', {
          tokenId: token.id,
          userId: user._id || user.id,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified
        });
      }
      
      return token;
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role || 'user';
        session.user.isVerified = token.isVerified || false;
        
        console.log('SESSION CREATION:', {
          id: session.user.id,
          email: session.user.email,
          role: session.user.role,
          isVerified: session.user.isVerified
        });
      }
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      console.log('REDIRECT CALLBACK:', { url, baseUrl });
      
      // If the URL is already absolute and on the same origin, allow it
      if (url.startsWith('http')) {
        const urlOrigin = new URL(url).origin;
        if (urlOrigin === new URL(baseUrl).origin) {
          console.log('Redirecting to same-origin URL:', url);
          return url;
        }
      }
      
      // If the URL is relative, prepend the base URL
      if (url.startsWith('/')) {
        console.log('Redirecting to internal URL:', url);
        return `${baseUrl}${url}`;
      }
      
      // Default to the base URL
      console.log('Redirecting to default URL:', baseUrl);
      return baseUrl;
    }
  },
  
  // JWT configuration
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  // JWT secret
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here',
  
  // Debug mode (enable for development)
  debug: process.env.NODE_ENV === 'development',
  
  // Explicitly configure cookies
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
};

export default authOptions;