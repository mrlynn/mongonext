/**
 * @file API routes for user management
 * @module app/api/users
 */

import { NextResponse } from 'next/server';
import { createUser, getUserById } from '@/lib/services/user.service';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/lib/auth/config';
import connectDB from '@/lib/db/connect';
import User from '@/models/user.model';

/**
 * API response format
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {Object} [data] - The requested data (on success)
 * @property {string} [error] - Error message (on failure)
 */

/**
 * Handle GET requests to the /api/users endpoint
 * Retrieves a single user by ID or a list of users with pagination
 * 
 * @async
 * @function GET
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response with user data or error
 * 
 * @example
 * // Get user by ID
 * GET /api/users?id=615f5c8a8c8c8c8c8c8c8c8c
 * 
 * @example
 * // Get all users with pagination
 * GET /api/users?page=1&limit=10&sort=name&order=asc&search=john&role=admin
 */
export async function GET(request) {
  try {
    // Check authentication and admin role
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Check if user is admin
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin access required' },
        { status: 403 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // If ID is provided, return a single user
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
    
    // Otherwise, return a paginated list of users
    await connectDB();
    
    // Parse pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Parse sorting parameters
    const sortField = searchParams.get('sort') || 'createdAt';
    const sortOrder = searchParams.get('order') === 'asc' ? 1 : -1;
    
    // Parse filter parameters
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    
    // Build query
    const query = {};
    
    // Add search filter if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Add role filter if provided
    if (role) {
      query.role = role;
    }
    
    // Execute query with pagination and sorting
    const users = await User.find(query)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const total = await User.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: {
        users,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Users fetch error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch users' },
      { status: 500 }
    );
  }
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