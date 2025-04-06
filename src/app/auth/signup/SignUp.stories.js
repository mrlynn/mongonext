/**
 * @file Story for Sign Up page
 * @module app/auth/signup/SignUp.stories
 */

import React from 'react';
import { Container, Box } from '@mui/material';
import RegisterForm from '@/components/auth/RegisterForm';
import { SessionProvider } from 'next-auth/react';

// Create a synchronous version of the page component for Storybook
const SignUpPageForStory = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 100px)',
          py: 4,
        }}
      >
        <RegisterForm />
      </Box>
    </Container>
  );
};

export default {
  title: 'Pages/Auth/SignUp',
  component: SignUpPageForStory,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <SessionProvider session={null}>
        <Story />
      </SessionProvider>
    ),
  ],
};

/**
 * Default view of the sign up page
 */
export const Default = () => <SignUpPageForStory />;

/**
 * Sign up page with custom rendering for Storybook
 * This doesn't affect actual functionality but helps with Storybook display
 */
export const WithoutFunctionality = () => {
  return (
    <div style={{ position: 'relative' }}>
      <SignUpPageForStory />
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
        * Form submission is disabled in Storybook
      </div>
    </div>
  );
};