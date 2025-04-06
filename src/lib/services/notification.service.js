/**
 * @file Service layer for notification-related operations
 * @module lib/services/notification
 */

import Notification from '@/models/notification.model';
import connectDB from '@/lib/db/connect';

/**
 * Create a new notification
 * 
 * @async
 * @function createNotification
 * @param {Object} notificationData - Notification data object
 * @param {string} notificationData.userId - ID of the user to notify
 * @param {string} notificationData.title - Title of the notification
 * @param {string} notificationData.message - Message content
 * @param {string} [notificationData.type='user'] - Type of notification
 * @param {string} [notificationData.link] - Associated link
 * @param {string} [notificationData.priority='low'] - Priority level
 * @returns {Promise<ServiceResponse>} Object with success flag and notification data or error
 */
export async function createNotification(notificationData) {
  await connectDB();
  
  try {
    const notification = new Notification(notificationData);
    await notification.save();
    
    return { success: true, data: notification };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get notifications for a user
 * 
 * @async
 * @function getUserNotifications
 * @param {string} userId - MongoDB ObjectId of the user
 * @param {Object} [options] - Query options
 * @param {number} [options.page=1] - Page number for pagination
 * @param {number} [options.limit=10] - Number of notifications per page
 * @param {boolean} [options.unreadOnly=false] - Whether to fetch only unread notifications
 * @returns {Promise<ServiceResponse>} Object with success flag and notifications data or error
 */
export async function getUserNotifications(userId, options = {}) {
  await connectDB();
  
  try {
    const {
      page = 1,
      limit = 10,
      unreadOnly = false
    } = options;

    const query = { userId };
    if (unreadOnly) {
      query.isRead = false;
    }

    const skip = (page - 1) * limit;
    
    const [notifications, total] = await Promise.all([
      Notification.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Notification.countDocuments(query)
    ]);

    return {
      success: true,
      data: {
        notifications,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Mark notifications as read
 * 
 * @async
 * @function markNotificationsAsRead
 * @param {string} userId - MongoDB ObjectId of the user
 * @param {string[]} [notificationIds] - Array of notification IDs to mark as read (if not provided, marks all as read)
 * @returns {Promise<ServiceResponse>} Object with success flag and update result or error
 */
export async function markNotificationsAsRead(userId, notificationIds = null) {
  await connectDB();
  
  try {
    const query = { userId };
    if (notificationIds) {
      query._id = { $in: notificationIds };
    }

    const result = await Notification.updateMany(
      query,
      { $set: { isRead: true } }
    );

    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Delete notifications
 * 
 * @async
 * @function deleteNotifications
 * @param {string} userId - MongoDB ObjectId of the user
 * @param {string[]} notificationIds - Array of notification IDs to delete
 * @returns {Promise<ServiceResponse>} Object with success flag and deletion result or error
 */
export async function deleteNotifications(userId, notificationIds) {
  await connectDB();
  
  try {
    const result = await Notification.deleteMany({
      userId,
      _id: { $in: notificationIds }
    });

    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get unread notification count for a user
 * 
 * @async
 * @function getUnreadCount
 * @param {string} userId - MongoDB ObjectId of the user
 * @returns {Promise<ServiceResponse>} Object with success flag and count or error
 */
export async function getUnreadCount(userId) {
  await connectDB();
  
  try {
    const count = await Notification.countDocuments({
      userId,
      isRead: false
    });

    return { success: true, data: { count } };
  } catch (error) {
    return { success: false, error: error.message };
  }
} 