/**
 * @file Story for Sign In page
 * @module app/auth/signin/SignIn.stories
 */

import React from 'react';
import { Container, Box } from '@mui/material';
import LoginForm from '@/components/auth/LoginForm';
import { SessionProvider } from 'next-auth/react';

// Create a synchronous version of the page component for Storybook
const SignInPageForStory = ({ searchParams = {} }) => {
  const callbackUrl = searchParams?.callbackUrl || '/dashboard';
  const error = searchParams?.error || null;
  
  // Map error codes to user-friendly messages
  let errorMessage = null;
  if (error) {
    switch (error) {
      case 'CredentialsSignin':
        errorMessage = 'Invalid email or password';
        break;
      case 'SessionRequired':
        errorMessage = 'You must be signed in to access this page';
        break;
      default:
        errorMessage = error;
    }
  }

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
        <LoginForm callbackUrl={callbackUrl} error={errorMessage} />
      </Box>
    </Container>
  );
};

export default {
  title: 'Pages/Auth/SignIn',
  component: SignInPageForStory,
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
 * Default view of the sign in page
 */
export const Default = () => <SignInPageForStory searchParams={{}} />;

/**
 * Sign in page with an error message
 */
export const WithError = () => (
  <SignInPageForStory searchParams={{ error: 'CredentialsSignin' }} />
);

/**
 * Sign in page with a callback URL
 */
export const WithCallbackUrl = () => (
  <SignInPageForStory searchParams={{ callbackUrl: '/admin' }} />
);