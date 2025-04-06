/**
 * @file User model definition with mongoose schema and authentication methods
 * @module models/user
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
const { Schema } = mongoose;

/**
 * User schema definition for MongoDB
 * @typedef {Object} UserSchema
 */
const UserSchema = new Schema({
  /**
   * User's full name
   * @type {String}
   * @required
   */
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  
  /**
   * User's email address (unique)
   * @type {String}
   * @required
   * @unique
   */
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  
  /**
   * User's hashed password
   * @type {String}
   * @required
   * @private - Not returned in queries by default
   */
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Don't return password by default in queries
  },
  
  /**
   * URL to user's profile image
   * @type {String}
   */
  profileImage: {
    type: String,
    default: ''
  },
  
  /**
   * User's role for authorization
   * @type {String}
   * @enum {string} - 'user', 'admin', 'moderator' 
   */
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  
  /**
   * Flag indicating if user's email is verified
   * @type {Boolean}
   */
  isVerified: {
    type: Boolean,
    default: false
  },
  
  /**
   * Token for email verification
   * @type {String}
   */
  verificationToken: String,
  
  /**
   * Expiry date for verification token
   * @type {Date}
   */
  verificationTokenExpiry: Date,
  
  /**
   * Token for password reset
   * @type {String}
   */
  resetPasswordToken: String,
  
  /**
   * Expiry date for password reset token
   * @type {Date}
   */
  resetPasswordExpiry: Date,
  
  /**
   * Timestamp of user's last login
   * @type {Date}
   */
  lastLogin: Date,
  
  /**
   * Custom metadata for the user
   * @type {Map<String, String>}
   */
  metadata: {
    type: Map,
    of: String
  }
}, {
  /**
   * Adds createdAt and updatedAt timestamps
   * @type {Object}
   * @property {Boolean} timestamps - Enable automatic timestamps
   */
  timestamps: true
});

// Index already declared in the schema definition
// UserSchema.index({ email: 1 });

/**
 * Pre-save middleware to hash user password
 * Only hashes the password if it has been modified or is new
 * @async
 * @function preSave
 * @param {Function} next - Express middleware next function
 * @returns {void}
 */
UserSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the new salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Compare provided password with user's hashed password
 * @async
 * @method comparePassword
 * @param {String} candidatePassword - The password to verify
 * @returns {Promise<Boolean>} True if passwords match, false otherwise
 * @throws {Error} If comparison fails
 */
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

/**
 * Generate email verification token and set expiry
 * @method generateVerificationToken
 * @returns {String} The verification token
 */
UserSchema.methods.generateVerificationToken = function() {
  const token = crypto.randomBytes(32).toString('hex');
  this.verificationToken = token;
  this.verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  return token;
};

/**
 * Generate password reset token and set expiry
 * @method generatePasswordResetToken
 * @returns {String} The password reset token
 */
UserSchema.methods.generatePasswordResetToken = function() {
  const token = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = token;
  this.resetPasswordExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
  return token;
};

/**
 * Virtual getter for user's full name
 * @virtual
 * @name fullName
 * @type {String}
 * @returns {String} User's full name
 */
UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

/**
 * Remove sensitive fields when converting to JSON
 * @method toJSON
 * @returns {Object} User object without sensitive fields
 */
UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.verificationToken;
  delete userObject.verificationTokenExpiry;
  delete userObject.resetPasswordToken;
  delete userObject.resetPasswordExpiry;
  return userObject;
};

/**
 * User model compiled from schema
 * @type {mongoose.Model}
 */
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;