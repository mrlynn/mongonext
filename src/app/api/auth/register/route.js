/**
 * @file API route for user registration
 * @module app/api/auth/register
 */

import { NextResponse } from 'next/server';
import { createUser } from '@/lib/services/user.service';
import crypto from 'crypto';
import connectDB from '@/lib/db/connect';
import User from '@/models/user.model';
import { sendVerificationEmail } from '@/lib/email/email.service';

/**
 * Handle POST requests to register a new user
 * 
 * @async
 * @function POST
 * @param {Request} request - The incoming request with user data
 * @returns {Promise<NextResponse>} JSON response
 * 
 * @example
 * // Register a new user
 * POST /api/auth/register
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "password": "securepassword"
 * }
 */
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }
    
    // Validate password length
    if (data.password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    
    // Add verification token
    await connectDB();
    
    // Check if email is already registered
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      );
    }
    
    // Generate verification token
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 24); // 24 hours validity
    
    // Add verification data
    data.verificationToken = token;
    data.verificationTokenExpiry = tokenExpiry;
    data.isVerified = false;
    
    // Create the user
    const result = await createUser(data);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
    
    // Send verification email
    const emailResult = await sendVerificationEmail({
      to: data.email,
      name: data.name,
      token: token
    });
    
    // Log email sending result (for debugging)
    if (emailResult.success) {
      console.log('Verification email sent successfully');
      if (emailResult.info && emailResult.info.messageId) {
        console.log('Message ID:', emailResult.info.messageId);
      }
      // For Ethereal test accounts, log the preview URL
      if (process.env.NODE_ENV === 'development' && emailResult.info && emailResult.info.messageUrl) {
        console.log('Email preview URL:', emailResult.info.messageUrl);
      }
    } else {
      console.error('Failed to send verification email:', emailResult.error);
    }
    
    // Remove sensitive data from response
    const userData = result.data.toJSON();
    
    return NextResponse.json(
      { 
        success: true, 
        data: {
          ...userData,
          // Include verification token in response for development/testing
          verificationToken: process.env.NODE_ENV === 'development' ? token : undefined,
          // Add email status to response
          emailSent: emailResult.success
        } 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}