/**
 * @file Email service for sending transactional emails
 * @module lib/email/email.service
 */

import nodemailer from 'nodemailer';

/**
 * Create a nodemailer transport using environment variables
 */
const createTransport = () => {
  const host = process.env.EMAIL_SERVER_HOST;
  const port = parseInt(process.env.EMAIL_SERVER_PORT || '587', 10);
  const user = process.env.EMAIL_SERVER_USER;
  const pass = process.env.EMAIL_SERVER_PASSWORD;
  const from = process.env.EMAIL_FROM;

  // Check if email configuration is available
  if (!host || !port || !user || !pass || !from) {
    console.warn('Email configuration is incomplete. Email sending will be simulated.');
    
    // Create a test account for development if not configured
    if (process.env.NODE_ENV === 'development') {
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: 'ethereal.user@ethereal.email', // This will be replaced by createTestAccount
          pass: 'ethereal.password'             // This will be replaced by createTestAccount
        }
      });
    }
  }

  // Create production transport
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
};

/**
 * Send an email
 * 
 * @async
 * @function sendEmail
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text email content
 * @param {string} [options.html] - HTML email content
 * @returns {Promise<Object>} Sending result with success flag and info or error
 */
export async function sendEmail({ to, subject, text, html }) {
  try {
    // Basic validation
    if (!to || !subject || !(text || html)) {
      return { success: false, error: 'Missing required email fields' };
    }

    let transport;
    let testAccount;

    // In development, if no email config, create a test account with Ethereal
    if (process.env.NODE_ENV === 'development' && 
        (!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_SERVER_USER)) {
      try {
        // Create test account only once
        testAccount = await nodemailer.createTestAccount();
        
        // Create test transport
        transport = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
        
        console.log('Using Ethereal test account for email delivery');
      } catch (error) {
        console.error('Failed to create test account:', error);
        return { success: false, error: 'Failed to create test email account' };
      }
    } else {
      // Use configured transport
      transport = createTransport();
    }

    // Send the email
    const info = await transport.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@example.com',
      to,
      subject,
      text,
      html: html || text,
    });

    // If using test account, provide preview URL
    if (testAccount) {
      console.log('Email preview URL:', nodemailer.getTestMessageUrl(info));
    }

    return { success: true, info };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send a verification email
 * 
 * @async
 * @function sendVerificationEmail
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.name - Recipient name
 * @param {string} options.token - Verification token
 * @returns {Promise<Object>} Sending result with success flag and info or error
 */
export async function sendVerificationEmail({ to, name, token }) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const verificationUrl = `${baseUrl}/auth/verify-email?token=${token}`;

  const subject = 'Verify your email address';
  const text = `
Hello ${name},

Thank you for signing up! Please verify your email address by clicking the link below:

${verificationUrl}

This link will expire in 24 hours.

If you didn't sign up for this account, please ignore this email.

Best regards,
The MongoNext Team
  `;

  const html = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #00684A;">Verify your email address</h2>
  <p>Hello ${name},</p>
  <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
  <p style="text-align: center; margin: 20px 0;">
    <a href="${verificationUrl}" 
       style="background-color: #00684A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
      Verify Email Address
    </a>
  </p>
  <p>Or copy and paste this link into your browser:</p>
  <p style="word-break: break-all; color: #666;">
    <a href="${verificationUrl}" style="color: #00684A;">${verificationUrl}</a>
  </p>
  <p>This link will expire in 24 hours.</p>
  <p>If you didn't sign up for this account, please ignore this email.</p>
  <p>Best regards,<br/>The MongoNext Team</p>
</div>
  `;

  return sendEmail({ to, subject, text, html });
}

/**
 * Send a password reset email
 * 
 * @async
 * @function sendPasswordResetEmail
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.name - Recipient name
 * @param {string} options.token - Password reset token
 * @returns {Promise<Object>} Sending result with success flag and info or error
 */
export async function sendPasswordResetEmail({ to, name, token }) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`;

  const subject = 'Reset your password';
  const text = `
Hello ${name || 'there'},

You requested to reset your password. Please click the link below to set a new password:

${resetUrl}

This link will expire in 1 hour.

If you didn't request a password reset, please ignore this email.

Best regards,
The MongoNext Team
  `;

  const html = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #00684A;">Reset your password</h2>
  <p>Hello ${name || 'there'},</p>
  <p>You requested to reset your password. Please click the button below to set a new password:</p>
  <p style="text-align: center; margin: 20px 0;">
    <a href="${resetUrl}" 
       style="background-color: #00684A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
      Reset Password
    </a>
  </p>
  <p>Or copy and paste this link into your browser:</p>
  <p style="word-break: break-all; color: #666;">
    <a href="${resetUrl}" style="color: #00684A;">${resetUrl}</a>
  </p>
  <p>This link will expire in 1 hour.</p>
  <p>If you didn't request a password reset, please ignore this email.</p>
  <p>Best regards,<br/>The MongoNext Team</p>
</div>
  `;

  return sendEmail({ to, subject, text, html });
}