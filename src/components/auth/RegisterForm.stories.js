/**
 * @file Story for RegisterForm component
 * @module components/auth/RegisterForm.stories
 */

import React from 'react';
import RegisterForm from './RegisterForm';
import { SessionProvider } from 'next-auth/react';

export default {
  title: 'Components/Auth/RegisterForm',
  component: RegisterForm,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onSuccess: { action: 'registration successful' },
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
 * Default state of the RegisterForm
 */
export const Default = (args) => <RegisterForm {...args} />;

/**
 * RegisterForm with mock success state
 */
export const Success = (args) => {
  // Mock implementation for Storybook
  return (
    <div className="mock-success-example">
      <RegisterForm {...args} />
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
Success.parameters = {
  docs: {
    description: {
      story: 'This example simulates how the form would look after successful registration.',
    },
  },
};

/**
 * RegisterForm with error state
 */
export const WithError = (args) => {
  // Mock implementation for Storybook
  return (
    <div className="mock-error-example">
      <RegisterForm {...args} />
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
        * Error state is simulated in real usage
      </div>
    </div>
  );
};
WithError.parameters = {
  docs: {
    description: {
      story: 'This example simulates how the form would look when an error occurs.',
    },
  },
};