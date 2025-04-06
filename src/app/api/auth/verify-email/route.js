/**
 * @file API route for email verification
 * @module app/api/auth/verify-email
 */

import { NextResponse } from 'next/server';
import { verifyUserEmail } from '@/lib/services/user.service';

/**
 * Handle GET requests to verify email with token from URL
 * 
 * @async
 * @function GET
 * @param {Request} request - The incoming request with token in query parameters
 * @returns {Promise<NextResponse>} JSON response with success or error
 */
export async function GET(request) {
  try {
    console.log('Verification GET request received');
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    console.log('Token from URL:', token);
    
    if (!token) {
      console.log('No token provided');
      return NextResponse.json(
        { success: false, error: 'Verification token is required' },
        { status: 400 }
      );
    }
    
    console.log('Calling verifyUserEmail with token');
    const result = await verifyUserEmail(token);
    console.log('verifyUserEmail result:', result);
    
    if (!result.success) {
      console.log('Verification failed:', result.error);
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
    
    console.log('Verification successful');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Email verification failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle POST requests to verify email with token in body
 * 
 * @async
 * @function POST
 * @param {Request} request - The incoming request with token in JSON body
 * @returns {Promise<NextResponse>} JSON response with success or error
 */
export async function POST(request) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Verification token is required' },
        { status: 400 }
      );
    }
    
    const result = await verifyUserEmail(token);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Email verification failed' },
      { status: 500 }
    );
  }
}