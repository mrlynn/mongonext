/**
 * @file Login form component
 * @module components/auth/LoginForm
 */

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Link as MuiLink,
  InputAdornment, 
  IconButton,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * Login form component for user authentication
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.callbackUrl='/dashboard'] - URL to redirect to after successful login
 * @param {string} [props.error] - Error message from authentication failure
 * @returns {React.ReactElement} Login form component
 */
const LoginForm = ({ callbackUrl = '/dashboard', error: initialError }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(initialError || '');

  // Check for login success or session state
  useEffect(() => {
    console.log('Session status:', status);
    console.log('Session data:', session);
    
    // Check for stored success flag from previous login attempt
    const loginSuccess = localStorage.getItem('loginSuccess');
    if (loginSuccess === 'true') {
      const redirectUrl = localStorage.getItem('loginRedirectUrl') || callbackUrl;
      console.log('Found login success flag, redirecting to:', redirectUrl);
      
      // Clear login success flags
      localStorage.removeItem('loginSuccess');
      localStorage.removeItem('loginRedirectUrl');
      
      // Force hard redirect
      window.location.href = redirectUrl;
      return;
    }
    
    // Normal session-based redirect
    if (status === 'authenticated' && session) {
      console.log('User already authenticated, redirecting to callbackUrl:', callbackUrl);
      window.location.href = callbackUrl;
    }
  }, [session, status, callbackUrl, router]);

  /**
   * Handle input changes
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear general error when user types
    if (error) {
      setError('');
    }
  };

  /**
   * Validate form data
   * @returns {boolean} True if form is valid
   */
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    console.log('Starting login process with callbackUrl:', callbackUrl);
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
        callbackUrl,
      });
      
      console.log('Sign in result:', result);
      
      if (result.error) {
        console.error('Login error:', result.error);
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }
      
      // Success - don't wait for session update, force redirect
      console.log('Login successful! Forcing redirect to:', result.url || callbackUrl);
      
      // Set a success flag in localStorage
      localStorage.setItem('loginSuccess', 'true');
      localStorage.setItem('loginRedirectUrl', result.url || callbackUrl);
      
      // Force reload first to establish cookies properly, then redirect
      window.location.reload();
      // The useEffect will detect the localStorage flag and redirect
      
    } catch (error) {
      console.error('Login exception:', error);
      setError('An error occurred during sign in');
      setIsLoading(false);
    }
  };

  /**
   * Toggle password visibility
   */
  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 480, width: '100%', mx: 'auto' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom fontWeight="bold">
        Sign In
      </Typography>
      
      <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
        Enter your credentials to access your account
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
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email || ' '}
          disabled={isLoading}
        />
        
        <TextField 
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password || ' '}
          disabled={isLoading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleTogglePassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <Box sx={{ textAlign: 'right', mt: 1, mb: 2 }}>
          <MuiLink
            component={Link}
            href="/auth/forgot-password"
            variant="body2"
            underline="hover"
          >
            Forgot password?
          </MuiLink>
        </Box>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          sx={{ 
            py: 1.5,
            mt: 1,
            mb: 3,
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
            'Sign In'
          )}
        </Button>
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <MuiLink
              component={Link}
              href="/auth/signup"
              variant="body2"
              fontWeight="bold"
              underline="hover"
            >
              Sign Up
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default LoginForm;