/**
 * @file Email verification page
 * @module app/auth/verify-email/page
 */

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { verifyEmail } from '@/lib/auth/auth.service';

/**
 * Email verification page component
 * Handles verification token from email links
 * 
 * @component
 * @returns {React.ReactElement} Email verification page component
 */
export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Skip verification if no token is provided
    if (!token) {
      setIsLoading(false);
      setError('No verification token provided');
      return;
    }
    
    // Verify the email
    const verifyUserEmail = async () => {
      try {
        console.log('Verifying email with token:', token);
        const result = await verifyEmail(token);
        console.log('Verification result:', result);
        
        if (result.success) {
          console.log('Verification successful');
          setSuccess(true);
        } else {
          console.log('Verification failed:', result.message);
          setError(result.message);
        }
      } catch (err) {
        console.error('Error during verification:', err);
        setError('An error occurred during verification');
      } finally {
        setIsLoading(false);
      }
    };
    
    verifyUserEmail();
  }, [token]);
  
  /**
   * Handle navigation to login page
   */
  const handleGoToLogin = () => {
    router.push('/auth/signin');
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
            textAlign: 'center',
            borderRadius: 2
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Email Verification
          </Typography>
          
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : success ? (
            <>
              <Alert severity="success" sx={{ my: 3 }}>
                Your email has been successfully verified!
              </Alert>
              
              <Typography paragraph>
                Thank you for verifying your email address. You can now sign in to your account.
              </Typography>
              
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={handleGoToLogin}
                sx={{ mt: 2 }}
              >
                Sign In
              </Button>
            </>
          ) : (
            <>
              <Alert severity="error" sx={{ my: 3 }}>
                {error || 'Verification failed'}
              </Alert>
              
              <Typography paragraph>
                We couldn't verify your email address. The verification link may be expired or invalid.
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Button 
                  component={Link}
                  href="/auth/signin"
                  variant="contained" 
                  sx={{ mr: 2 }}
                >
                  Sign In
                </Button>
                <Button 
                  component={Link}
                  href="/auth/signup"
                  variant="outlined"
                >
                  Register Again
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
}