/**
 * @file Story for Forgot Password page
 * @module app/auth/forgot-password/ForgotPassword.stories
 */

import React from 'react';
import ForgotPasswordPage from './page';

// This is a client component (has 'use client' directive) so it should work in Storybook

export default {
  title: 'Pages/Auth/ForgotPassword',
  component: ForgotPasswordPage,
  parameters: {
    layout: 'fullscreen',
  },
};

/**
 * Default view of the forgot password page
 */
export const Default = () => <ForgotPasswordPage />;

/**
 * Success state after requesting password reset
 * This is for documentation only - the actual component manages its own state
 */
export const SuccessState = () => {
  return (
    <div style={{ position: 'relative' }}>
      <ForgotPasswordPage />
      <div style={{ 
        position: 'absolute', 
        bottom: 10, 
        left: 0, 
        width: '100%',
        textAlign: 'center',
        color: '#666',
        fontSize: '0.8rem',
        fontStyle: 'italic'
      }}>
        * Success state is simulated in real usage
      </div>
    </div>
  );
};
SuccessState.parameters = {
  docs: {
    description: {
      story: 'This view shows how the component looks when a password reset is successfully requested.',
    },
  },
};