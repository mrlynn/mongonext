/**
 * @file API routes for user management
 * @module app/api/users
 */

import { NextResponse } from 'next/server';
import { createUser, getUserById } from '@/lib/services/user.service';

/**
 * API response format
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {Object} [data] - The requested data (on success)
 * @property {string} [error] - Error message (on failure)
 */

/**
 * Handle GET requests to the /api/users endpoint
 * Retrieves a single user by ID
 * 
 * @async
 * @function GET
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with user data or error
 * 
 * @example
 * // Get user by ID
 * GET /api/users?id=615f5c8a8c8c8c8c8c8c8c8c
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (id) {
    const result = await getUserById(id);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: result.data });
  }
  
  // This would be where you'd implement paginated users list
  // with proper authentication checks
  
  return NextResponse.json(
    { success: false, error: 'Method not implemented' },
    { status: 501 }
  );
}

/**
 * Handle POST requests to the /api/users endpoint
 * Creates a new user
 * 
 * @async
 * @function POST
 * @param {Request} request - The incoming request object with JSON body
 * @returns {Promise<NextResponse>} JSON response with created user or error
 * 
 * @example
 * // Create a new user
 * POST /api/users
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "password": "securepassword"
 * }
 */
export async function POST(request) {
  try {
    const data = await request.json();
    const result = await createUser(data);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: true, data: result.data },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}