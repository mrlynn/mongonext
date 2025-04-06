/**
 * @file Notification menu component for displaying notifications in the navbar
 * @module components/ui/NotificationMenu
 */

import React, { useState } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  CircularProgress,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondary,
  Tooltip
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';

/**
 * NotificationMenu component
 * @component
 * @returns {JSX.Element} Notification menu component
 */
export default function NotificationMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    deleteNotifications
  } = useNotifications();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    // Mark all as read when opening the menu
    if (unreadCount > 0) {
      markAsRead();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (notificationId) => {
    deleteNotifications([notificationId]);
  };

  const handleDeleteAll = () => {
    const notificationIds = notifications.map(n => n._id);
    deleteNotifications(notificationIds);
    handleClose();
  };

  const getNotificationColor = (type, isRead) => {
    if (isRead) return 'text.secondary';
    
    switch (type) {
      case 'system':
        return 'error.main';
      case 'other':
        return 'warning.main';
      default:
        return 'primary.main';
    }
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          color="inherit"
          onClick={handleOpen}
          size="large"
        >
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight: 400,
            width: '100%',
            maxWidth: 360,
            '& .MuiList-root': {
              padding: 0,
            },
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Notifications
          </Typography>
          {notifications.length > 0 && (
            <Tooltip title="Delete all">
              <IconButton onClick={handleDeleteAll} size="small">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        {loading ? (
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={24} />
          </Box>
        ) : error ? (
          <Box sx={{ p: 2 }}>
            <Typography color="error">
              {error}
            </Typography>
          </Box>
        ) : notifications.length === 0 ? (
          <Box sx={{ p: 2 }}>
            <Typography color="text.secondary" align="center">
              No notifications
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {notifications.map((notification) => (
              <React.Fragment key={notification._id}>
                <ListItem
                  sx={{
                    borderLeft: 3,
                    borderColor: getNotificationColor(notification.type, notification.isRead),
                  }}
                  secondaryAction={
                    <Tooltip title="Delete">
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => handleDelete(notification._id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle2"
                        color={notification.isRead ? 'text.secondary' : 'text.primary'}
                      >
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            mb: 0.5
                          }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Menu>
    </>
  );
} 