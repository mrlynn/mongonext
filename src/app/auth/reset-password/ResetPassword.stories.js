/**
 * @file Story for Reset Password page
 * @module app/auth/reset-password/ResetPassword.stories
 */

import React from 'react';
import ResetPasswordPage from './page';

const mockRouter = {
  push: () => {},
};

const mockSearchParams = {
  get: (param) => param === 'token' ? 'mock-reset-token' : null,
};

// Override the imports at the component level using a wrapper component
const ResetPasswordPageWithMocks = () => {
  // We're not actually rendering the real component as it won't work without proper Next.js context
  return <Documentation />;
};

export default {
  title: 'Pages/Auth/ResetPassword',
  component: ResetPasswordPageWithMocks,
  parameters: {
    layout: 'fullscreen',
  },
};

/**
 * Documentation view that explains the component instead of trying to render it
 */
export const Documentation = () => (
  <div style={{ 
    padding: '20px', 
    maxWidth: '800px', 
    margin: '0 auto',
    fontFamily: 'system-ui, sans-serif',
  }}>
    <h1>Reset Password Page</h1>
    <p>This component requires Next.js hooks that are difficult to mock in Storybook.</p>
    <p>When integrated in the application, this page:</p>
    <ul>
      <li>Presents a form to reset a user's password</li>
      <li>Validates the token from the URL</li>
      <li>Allows users to enter and confirm a new password</li>
      <li>Validates password strength and match</li>
      <li>Submits the form to the API</li>
      <li>Shows success or error messages</li>
    </ul>
    <p><strong>Note:</strong> To test this component in a real environment, use the actual application flow.</p>
  </div>
);