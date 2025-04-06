/**
 * @file Custom hook for managing notifications
 * @module hooks/useNotifications
 */

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

/**
 * Custom hook for managing notifications
 * @returns {Object} Notification methods and state
 */
export function useNotifications() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch notifications from the API
   * @async
   * @function fetchNotifications
   * @param {Object} [options] - Query options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.limit=10] - Items per page
   * @param {boolean} [options.unreadOnly=false] - Fetch only unread notifications
   */
  const fetchNotifications = useCallback(async (options = {}) => {
    if (!session) return;

    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        page: options.page || 1,
        limit: options.limit || 10,
        unreadOnly: options.unreadOnly || false
      });

      const response = await fetch(`/api/notifications?${queryParams}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      setNotifications(result.data.notifications);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [session]);

  /**
   * Fetch unread notification count
   * @async
   * @function fetchUnreadCount
   */
  const fetchUnreadCount = useCallback(async () => {
    if (!session) return;

    try {
      const response = await fetch('/api/notifications/unread-count');
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      setUnreadCount(result.data.count);
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  }, [session]);

  /**
   * Mark notifications as read
   * @async
   * @function markAsRead
   * @param {string[]} [notificationIds] - IDs of notifications to mark as read
   */
  const markAsRead = useCallback(async (notificationIds = null) => {
    if (!session) return;

    try {
      const response = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationIds }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      // Update local state
      setNotifications(current =>
        current.map(notification => ({
          ...notification,
          isRead: true,
        }))
      );
      await fetchUnreadCount();
    } catch (err) {
      console.error('Error marking notifications as read:', err);
    }
  }, [session, fetchUnreadCount]);

  /**
   * Delete notifications
   * @async
   * @function deleteNotifications
   * @param {string[]} notificationIds - IDs of notifications to delete
   */
  const deleteNotifications = useCallback(async (notificationIds) => {
    if (!session) return;

    try {
      const response = await fetch('/api/notifications', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationIds }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      // Update local state
      setNotifications(current =>
        current.filter(notification => !notificationIds.includes(notification._id))
      );
      await fetchUnreadCount();
    } catch (err) {
      console.error('Error deleting notifications:', err);
    }
  }, [session, fetchUnreadCount]);

  // Fetch notifications and unread count on mount and when session changes
  useEffect(() => {
    if (session) {
      fetchNotifications();
      fetchUnreadCount();
    }
  }, [session, fetchNotifications, fetchUnreadCount]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    deleteNotifications,
    fetchUnreadCount
  };
} 