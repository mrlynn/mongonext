/**
 * @file API route for user profile operations
 * @module app/api/users/profile
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { updateUser, getUserById } from '@/lib/services/user.service';
import authOptions from '@/lib/auth/config';

/**
 * Handle GET requests to get the current user's profile
 * 
 * @async
 * @function GET
 * @param {Request} request - The incoming request
 * @returns {Promise<NextResponse>} JSON response with user profile data or error
 */
export async function GET(request) {
  try {
    // Get the authenticated user's session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Get the user profile from the database
    const userId = session.user.id;
    const result = await getUserById(userId);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 404 }
      );
    }
    
    // Return the user profile
    return NextResponse.json({
      success: true, 
      data: result.data
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

/**
 * Handle PATCH requests to update the current user's profile
 * 
 * @async
 * @function PATCH
 * @param {Request} request - The incoming request with profile data
 * @returns {Promise<NextResponse>} JSON response with updated profile or error
 * 
 * @example
 * // Update user profile
 * PATCH /api/users/profile
 * {
 *   "name": "Updated Name",
 *   "profileImage": "https://example.com/image.jpg"
 * }
 */
export async function PATCH(request) {
  try {
    // Get the authenticated user's session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Get the data to update
    const data = await request.json();
    const userId = session.user.id;
    
    // Only allow certain fields to be updated
    const allowedFields = ['name', 'profileImage'];
    const updateData = {};
    
    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }
    
    // Update the profile
    const result = await updateUser(userId, updateData);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
    
    // Return the updated profile
    return NextResponse.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update profile' },
      { status: 500 }
    );
  }
}