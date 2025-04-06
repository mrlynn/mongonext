/**
 * @file Service layer for user-related operations
 * @module lib/services/user
 */

import User from '@/models/user.model';
import connectDB from '@/lib/db/connect';
import { sendPasswordResetEmail } from '@/lib/email/email.service';

/**
 * Response object returned from user service functions
 * @typedef {Object} ServiceResponse
 * @property {boolean} success - Whether the operation was successful
 * @property {Object} [data] - The data returned (if successful)
 * @property {string} [error] - Error message (if unsuccessful)
 */

/**
 * Create a new user in the database
 * 
 * @async
 * @function createUser
 * @param {Object} userData - User data object
 * @param {string} userData.name - User's full name
 * @param {string} userData.email - User's email address
 * @param {string} userData.password - User's password (will be hashed)
 * @param {string} [userData.profileImage] - URL to user's profile image
 * @param {string} [userData.role] - User's role (defaults to 'user')
 * @returns {Promise<ServiceResponse>} Object with success flag and user data or error
 */
export async function createUser(userData) {
  await connectDB();
  
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return { success: false, error: 'Email already in use' };
    }
    
    const user = new User(userData);
    await user.save();
    
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Retrieve a user by their ID
 * 
 * @async
 * @function getUserById
 * @param {string} id - MongoDB ObjectId of the user
 * @returns {Promise<ServiceResponse>} Object with success flag and user data or error
 */
export async function getUserById(id) {
  await connectDB();
  
  try {
    const user = await User.findById(id);
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Update a user's information
 * 
 * @async
 * @function updateUser
 * @param {string} id - MongoDB ObjectId of the user
 * @param {Object} updateData - Data to update
 * @param {string} [updateData.name] - User's name
 * @param {string} [updateData.email] - User's email
 * @param {string} [updateData.profileImage] - URL to user's profile image
 * @param {boolean} [updateData.isVerified] - Email verification status
 * @returns {Promise<ServiceResponse>} Object with success flag and updated user data or error
 */
export async function updateUser(id, updateData) {
  await connectDB();
  
  try {
    // Don't allow role updates through this function for security
    if (updateData.role) {
      delete updateData.role;
    }
    
    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Verify a user's email using the verification token
 * 
 * @async
 * @function verifyUserEmail
 * @param {string} token - Email verification token
 * @returns {Promise<ServiceResponse>} Object with success flag and user data or error
 */
export async function verifyUserEmail(token) {
  try {
    console.log('verifyUserEmail called with token:', token);
    
    await connectDB();
    console.log('Connected to database');
    
    // Find the user with this verification token
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() }
    });
    
    console.log('User lookup result:', user ? 'User found' : 'No user found');
    
    if (!user) {
      console.log('No user found with this verification token or token expired');
      return { success: false, error: 'Invalid or expired verification token' };
    }
    
    // Update the user
    console.log('Updating user verification status');
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    
    // Save the user
    await user.save();
    console.log('User updated successfully, isVerified:', user.isVerified);
    
    return { success: true, data: user };
  } catch (error) {
    console.error('Error in verifyUserEmail:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Start the password reset process for a user
 * Generates a reset token and would typically send it via email
 * 
 * @async
 * @function initiatePasswordReset
 * @param {string} email - User's email address
 * @returns {Promise<ServiceResponse>} Object with success flag or error
 * @note Always returns success=true even if user doesn't exist (for security)
 */
export async function initiatePasswordReset(email) {
  await connectDB();
  
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      // Return success even if user doesn't exist for security reasons
      return { success: true };
    }
    
    const token = user.generatePasswordResetToken();
    await user.save();
    
    // Send password reset email
    const emailResult = await sendPasswordResetEmail({
      to: email,
      name: user.name,
      token: token
    });
    
    // Log email sending result (for debugging)
    if (emailResult.success) {
      console.log('Password reset email sent successfully');
      if (emailResult.info && emailResult.info.messageId) {
        console.log('Message ID:', emailResult.info.messageId);
      }
      // For Ethereal test accounts, log the preview URL
      if (process.env.NODE_ENV === 'development' && emailResult.info && emailResult.info.messageUrl) {
        console.log('Email preview URL:', emailResult.info.messageUrl);
      }
    } else {
      console.error('Failed to send password reset email:', emailResult.error);
    }
    
    return { 
      success: true,
      emailSent: emailResult.success,
      // Include token in development mode for testing
      resetToken: process.env.NODE_ENV === 'development' ? token : undefined
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Reset a user's password using a valid token
 * 
 * @async
 * @function resetPassword
 * @param {string} token - Password reset token
 * @param {string} newPassword - New password to set
 * @returns {Promise<ServiceResponse>} Object with success flag or error
 */
export async function resetPassword(token, newPassword) {
  await connectDB();
  
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() }
    }).select('+password');
    
    if (!user) {
      return { success: false, error: 'Invalid or expired reset token' };
    }
    
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Delete a user from the database
 * 
 * @async
 * @function deleteUser
 * @param {string} id - MongoDB ObjectId of the user
 * @returns {Promise<ServiceResponse>} Object with success flag or error
 */
export async function deleteUser(id) {
  await connectDB();
  
  try {
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}