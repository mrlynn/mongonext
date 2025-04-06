/**
 * @file API route for password reset request
 * @module app/api/auth/forgot-password
 */

import { NextResponse } from 'next/server';
import { initiatePasswordReset } from '@/lib/services/user.service';

/**
 * Handle POST requests to initiate password reset
 * Generates a reset token for a user and would typically send it via email
 * 
 * @async
 * @function POST
 * @param {Request} request - The incoming request object with email in JSON body
 * @returns {Promise<NextResponse>} JSON response with success or error
 * 
 * @example
 * // Request password reset
 * POST /api/auth/forgot-password
 * {
 *   "email": "user@example.com"
 * }
 * 
 * @security This endpoint always returns success even if the email doesn't exist
 * in the database to prevent user enumeration attacks
 */
export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }
    
    const result = await initiatePasswordReset(email);
    
    // Always return success for security (even if email doesn't exist)
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}