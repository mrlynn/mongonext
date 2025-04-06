/**
 * @file Sign-in page
 * @module app/auth/signin/page
 */

import React from 'react';
import { Container, Box } from '@mui/material';
import LoginForm from '@/components/auth/LoginForm';

/**
 * Sign-in page for user authentication
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.searchParams - URL query parameters
 * @returns {React.ReactElement} Sign-in page component
 */
export default async function SignInPage(props) {
  // Hard-code default values for development
  // This avoids the searchParams error while we debug
  const defaultCallbackUrl = '/dashboard';
  
  // Simply pass the hard-coded value to the client component
  // The LoginForm will handle the actual redirect logic
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
        <LoginForm callbackUrl={defaultCallbackUrl} />
      </Box>
    </Container>
  );
}

/**
 * Metadata for sign-in page
 * @type {Object}
 */
export const metadata = {
  title: 'Sign In | MongoNext',
  description: 'Sign in to your MongoNext account',
};