/**
 * @file Client-side authentication service
 * @module lib/auth/auth.service
 */

/**
 * Response object for auth service functions
 * @typedef {Object} AuthResponse
 * @property {boolean} success - Whether the operation was successful
 * @property {string} [message] - Success or error message
 * @property {Object} [data] - Additional data returned
 * @property {Object} [error] - Detailed error information
 */

/**
 * Register (sign up) a new user
 * 
 * @async
 * @function register
 * @param {Object} userData - New user data
 * @param {string} userData.name - User's full name
 * @param {string} userData.email - User's email address
 * @param {string} userData.password - User's password
 * @returns {Promise<AuthResponse>} Authentication response
 */
export async function register(userData) {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        message: data.error || 'Registration failed',
        error: data
      };
    }
    
    return {
      success: true,
      message: 'Registration successful! Please check your email to verify your account.',
      data: data.data
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred during registration',
      error
    };
  }
}

/**
 * Request password reset
 * 
 * @async
 * @function forgotPassword
 * @param {string} email - User's email address
 * @returns {Promise<AuthResponse>} Authentication response
 */
export async function forgotPassword(email) {
  try {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        message: data.error || 'Failed to process password reset request',
        error: data
      };
    }
    
    return {
      success: true,
      message: 'If an account exists with this email, you will receive password reset instructions.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred during password reset request',
      error
    };
  }
}

/**
 * Reset password using token
 * 
 * @async
 * @function resetPassword
 * @param {Object} resetData - Password reset data
 * @param {string} resetData.token - Password reset token
 * @param {string} resetData.password - New password
 * @returns {Promise<AuthResponse>} Authentication response
 */
export async function resetPassword(resetData) {
  try {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resetData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        message: data.error || 'Failed to reset password',
        error: data
      };
    }
    
    return {
      success: true,
      message: 'Password reset successful! You can now sign in with your new password.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred during password reset',
      error
    };
  }
}

/**
 * Verify email using token
 * 
 * @async
 * @function verifyEmail
 * @param {string} token - Email verification token
 * @returns {Promise<AuthResponse>} Authentication response
 */
export async function verifyEmail(token) {
  try {
    const response = await fetch(`/api/auth/verify-email?token=${token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        message: data.error || 'Email verification failed',
        error: data
      };
    }
    
    return {
      success: true,
      message: 'Email verified successfully! You can now sign in.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred during email verification',
      error
    };
  }
}

/**
 * Update user profile
 * 
 * @async
 * @function updateProfile
 * @param {Object} profileData - User profile data to update
 * @returns {Promise<AuthResponse>} Authentication response
 */
export async function updateProfile(profileData) {
  try {
    const response = await fetch('/api/users/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        message: data.error || 'Failed to update profile',
        error: data
      };
    }
    
    return {
      success: true,
      message: 'Profile updated successfully!',
      data: data.data
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while updating profile',
      error
    };
  }
}

/**
 * Change user password
 * 
 * @async
 * @function changePassword
 * @param {Object} passwordData - Password change data
 * @param {string} passwordData.currentPassword - Current password
 * @param {string} passwordData.newPassword - New password
 * @returns {Promise<AuthResponse>} Authentication response
 */
export async function changePassword(passwordData) {
  try {
    const response = await fetch('/api/users/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(passwordData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        message: data.error || 'Failed to change password',
        error: data
      };
    }
    
    return {
      success: true,
      message: 'Password changed successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while changing password',
      error
    };
  }
}