/**
 * @file API route for changing user password
 * @module app/api/users/change-password
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/db/connect';
import User from '@/models/user.model';
import authOptions from '@/lib/auth/config';

/**
 * Handle POST requests to change user password
 * 
 * @async
 * @function POST
 * @param {Request} request - The incoming request with current and new password
 * @returns {Promise<NextResponse>} JSON response with success or error
 * 
 * @example
 * // Change password
 * POST /api/users/change-password
 * {
 *   "currentPassword": "oldpassword",
 *   "newPassword": "newpassword"
 * }
 */
export async function POST(request) {
  try {
    // Get the authenticated user's session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Get the password data
    const { currentPassword, newPassword } = await request.json();
    
    // Validate data
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Current password and new password are required' },
        { status: 400 }
      );
    }
    
    // Validate new password length
    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await connectDB();
    
    // Get the user with password field included
    const userId = session.user.id;
    const user = await User.findById(userId).select('+password');
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Verify current password
    const isValid = await user.comparePassword(currentPassword);
    
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect' },
        { status: 400 }
      );
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to change password' },
      { status: 500 }
    );
  }
}