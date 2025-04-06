/**
 * @file Password reset page
 * @module app/auth/reset-password/page
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
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { resetPassword } from '@/lib/auth/auth.service';

/**
 * Password reset page component
 * Handles password reset form with token from email
 * 
 * @component
 * @returns {React.ReactElement} Password reset page component
 */
export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  
  // Validate password
  const validateForm = () => {
    const newErrors = {};
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      setError('Reset token is missing');
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await resetPassword({ token, password });
      
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('An error occurred during password reset');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle password visibility toggle
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'password') {
      setPassword(value);
      // Clear error when typing
      if (errors.password) {
        setErrors((prev) => ({ ...prev, password: '' }));
      }
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
      // Clear error when typing
      if (errors.confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: '' }));
      }
    }
    
    // Clear general error
    if (error) {
      setError('');
    }
  };
  
  // Handle navigation to login
  const handleGoToLogin = () => {
    router.push('/auth/signin');
  };
  
  // If no token provided, show error
  if (!token && !isLoading && !success) {
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
              Reset Password
            </Typography>
            
            <Alert severity="error" sx={{ my: 3 }}>
              No reset token provided
            </Alert>
            
            <Typography paragraph>
              The password reset link is invalid or expired. Please request a new password reset.
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              <Button 
                component={Link}
                href="/auth/forgot-password"
                variant="contained" 
                sx={{ mr: 2 }}
              >
                Reset Password
              </Button>
              <Button 
                component={Link}
                href="/auth/signin"
                variant="outlined"
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    );
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
            Reset Password
          </Typography>
          
          {success ? (
            <>
              <Alert severity="success" sx={{ my: 3 }}>
                Your password has been successfully reset!
              </Alert>
              
              <Typography paragraph align="center">
                You can now sign in to your account with your new password.
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  onClick={handleGoToLogin}
                >
                  Sign In
                </Button>
              </Box>
            </>
          ) : (
            <Box component="form" onSubmit={handleSubmit} noValidate>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password || 'Must be at least 8 characters'}
                disabled={isLoading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword || ' '}
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
          )}
        </Paper>
      </Box>
    </Container>
  );
}