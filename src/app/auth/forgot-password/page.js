/**
 * @file Forgot password page
 * @module app/auth/forgot-password/page
 */

'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button,
  TextField,
  CircularProgress,
  Alert
} from '@mui/material';
import Link from 'next/link';
import { forgotPassword } from '@/lib/auth/auth.service';

/**
 * Forgot password page component
 * Allows users to request a password reset
 * 
 * @component
 * @returns {React.ReactElement} Forgot password page component
 */
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  /**
   * Validate the email
   * @returns {boolean} True if email is valid
   */
  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };
  
  /**
   * Handle form submission
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await forgotPassword(email);
      
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Handle email input change
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 100px)',
          py: 8,
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%',
            borderRadius: 2
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" align="center">
            Forgot Password
          </Typography>
          
          {success ? (
            <>
              <Alert severity="success" sx={{ my: 3 }}>
                Password reset instructions sent!
              </Alert>
              
              <Typography paragraph>
                If an account exists for <strong>{email}</strong>, we've sent instructions to reset your password.
              </Typography>
              
              <Typography paragraph>
                Please check your email inbox and follow the instructions to reset your password.
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button 
                  component={Link}
                  href="/auth/signin"
                  variant="contained" 
                >
                  Back to Sign In
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
                Enter your email address below and we'll send you instructions to reset your password.
              </Typography>
              
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{ 
                    mt: 3, 
                    mb: 2,
                    py: 1.5,
                    position: 'relative'
                  }}
                >
                  {isLoading ? (
                    <CircularProgress 
                      size={24} 
                      sx={{ position: 'absolute' }} 
                      color="inherit" 
                    />
                  ) : (
                    'Reset Password'
                  )}
                </Button>
                
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Remembered your password?{' '}
                    <Link href="/auth/signin" style={{ textDecoration: 'none' }}>
                      Sign In
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
}