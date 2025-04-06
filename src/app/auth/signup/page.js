/**
 * @file Sign-up page
 * @module app/auth/signup/page
 */

import React from 'react';
import { Container, Box } from '@mui/material';
import RegisterForm from '@/components/auth/RegisterForm';

/**
 * Sign-up page for new user registration
 * 
 * @component
 * @returns {React.ReactElement} Sign-up page component
 */
export default function SignUpPage() {
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
}

/**
 * Metadata for sign-up page
 * @type {Object}
 */
export const metadata = {
  title: 'Sign Up | MongoNext',
  description: 'Create a new account for MongoNext',
};