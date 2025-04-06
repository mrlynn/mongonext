/**
 * @file API routes for notification management
 * @module app/api/notifications
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/config';
import {
  createNotification,
  getUserNotifications,
  markNotificationsAsRead,
  deleteNotifications,
  getUnreadCount
} from '@/lib/services/notification.service';

/**
 * Handle GET requests to fetch notifications
 * 
 * @async
 * @function GET
 * @param {Request} request - The incoming request
 * @returns {Promise<NextResponse>} JSON response with notifications or error
 */
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    const result = await getUserNotifications(session.user.id, {
      page,
      limit,
      unreadOnly
    });

    if (!result.success) {
      throw new Error(result.error);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Handle POST requests to create a notification
 * 
 * @async
 * @function POST
 * @param {Request} request - The incoming request
 * @returns {Promise<NextResponse>} JSON response with created notification or error
 */
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const result = await createNotification({
      ...data,
      userId: session.user.id
    });

    if (!result.success) {
      throw new Error(result.error);
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Handle PATCH requests to mark notifications as read
 * 
 * @async
 * @function PATCH
 * @param {Request} request - The incoming request
 * @returns {Promise<NextResponse>} JSON response with update result or error
 */
export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const result = await markNotificationsAsRead(
      session.user.id,
      data.notificationIds
    );

    if (!result.success) {
      throw new Error(result.error);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Handle DELETE requests to remove notifications
 * 
 * @async
 * @function DELETE
 * @param {Request} request - The incoming request
 * @returns {Promise<NextResponse>} JSON response with deletion result or error
 */
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    if (!data.notificationIds || !Array.isArray(data.notificationIds)) {
      return NextResponse.json(
        { success: false, error: 'notificationIds array is required' },
        { status: 400 }
      );
    }

    const result = await deleteNotifications(
      session.user.id,
      data.notificationIds
    );

    if (!result.success) {
      throw new Error(result.error);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 