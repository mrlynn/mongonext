/**
 * @file Story for LoginForm component
 * @module components/auth/LoginForm.stories
 */

import React from 'react';
import LoginForm from './LoginForm';
import { SessionProvider } from 'next-auth/react';

export default {
  title: 'Components/Auth/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    callbackUrl: { control: 'text' },
    error: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <SessionProvider session={null}>
        <div style={{ width: '480px' }}>
          <Story />
        </div>
      </SessionProvider>
    ),
  ],
};

/**
 * Default state of the LoginForm
 */
export const Default = (args) => <LoginForm {...args} />;
Default.args = {
  callbackUrl: '/dashboard',
};

/**
 * LoginForm with an error message
 */
export const WithError = (args) => <LoginForm {...args} />;
WithError.args = {
  callbackUrl: '/dashboard',
  error: 'Invalid email or password',
};

/**
 * LoginForm with loading state
 * Note: This is a mock as the actual loading state is managed internally
 */
export const Loading = (args) => {
  // Mock implementation for Storybook
  // This doesn't actually trigger the real loading state
  // but shows how it would look
  return (
    <div className="mock-loading-example">
      <LoginForm {...args} />
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
        * Loading state is simulated in real usage
      </div>
    </div>
  );
};
Loading.args = {
  callbackUrl: '/dashboard',
};
Loading.parameters = {
  docs: {
    description: {
      story: 'This example simulates how the form would look in loading state.',
    },
  },
};