/**
 * @file Story for Email Verification page
 * @module app/auth/verify-email/VerifyEmail.stories
 */

import React from 'react';
import VerifyEmailPage from './page';

// This component has 'use client' directive and uses Next.js hooks
// We'll use documentation-style stories instead of trying to render the actual component

export default {
  title: 'Pages/Auth/VerifyEmail',
  component: VerifyEmailPage,
  parameters: {
    layout: 'fullscreen',
  },
};

/**
 * Documentation for the email verification page
 */
export const Documentation = () => (
  <div style={{ 
    padding: '20px', 
    maxWidth: '800px', 
    margin: '0 auto',
    fontFamily: 'system-ui, sans-serif',
  }}>
    <h1>Email Verification Page</h1>
    <p>This component requires Next.js hooks that are difficult to mock in Storybook.</p>
    <p>When integrated in the application, this page:</p>
    <ul>
      <li>Automatically verifies a user's email using the token in the URL</li>
      <li>Shows a loading state while verification is in progress</li>
      <li>Displays a success message when verification is successful</li>
      <li>Shows an error message if verification fails</li>
      <li>Provides a link to sign in after successful verification</li>
    </ul>
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px 0',
      backgroundColor: '#f9f9f9',
    }}>
      <h3>States</h3>
      <p><strong>Loading:</strong> "Verifying your email address..."</p>
      <p><strong>Success:</strong> "Email verified successfully! You can now sign in."</p>
      <p><strong>Error:</strong> "Email verification failed. The link may be invalid or expired."</p>
    </div>
    <p><strong>Note:</strong> To test this component in a real environment, use the actual verification link from a registration email.</p>
  </div>
);