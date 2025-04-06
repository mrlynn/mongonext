/**
 * @file Notification model definition with mongoose schema
 * @module models/notification
 */

import mongoose from 'mongoose';
const { Schema } = mongoose;

/**
 * Notification schema definition for MongoDB
 * @typedef {Object} NotificationSchema
 */
const NotificationSchema = new Schema({
  /**
   * User ID who should receive the notification
   * @type {mongoose.Schema.Types.ObjectId}
   * @required
   */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },

  /**
   * Title of the notification
   * @type {String}
   * @required
   */
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },

  /**
   * Message content of the notification
   * @type {String}
   * @required
   */
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [500, 'Message cannot be more than 500 characters']
  },

  /**
   * Type of notification (user, system, or other)
   * @type {String}
   * @required
   */
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['user', 'system', 'other'],
    default: 'user'
  },

  /**
   * Whether the notification has been read
   * @type {Boolean}
   */
  isRead: {
    type: Boolean,
    default: false
  },

  /**
   * Link associated with the notification (optional)
   * @type {String}
   */
  link: {
    type: String,
    trim: true
  },

  /**
   * Priority level of the notification
   * @type {String}
   */
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
NotificationSchema.index({ userId: 1, createdAt: -1 });
NotificationSchema.index({ userId: 1, isRead: 1 });

/**
 * Notification model compiled from schema
 * @type {mongoose.Model}
 */
const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

export default Notification; 