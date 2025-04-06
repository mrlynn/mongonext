/**
 * @file Registration form component
 * @module components/auth/RegisterForm
 */

'use client';

import React, { useState } from 'react';
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
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { register } from '@/lib/auth/auth.service';

/**
 * Registration form component for new user sign-up
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} [props.onSuccess] - Callback function on successful registration
 * @returns {React.ReactElement} Registration form component
 */
const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  /**
   * Handle input changes
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
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
    
    try {
      // Remove confirmPassword and acceptTerms from the data sent to API
      const { confirmPassword, acceptTerms, ...userData } = formData;
      
      const result = await register(userData);
      
      if (!result.success) {
        setError(result.message || 'Registration failed');
        setIsLoading(false);
        return;
      }
      
      setSuccess(true);
      
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      setError('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Toggle password visibility
   */
  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  /**
   * Toggle confirm password visibility
   */
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(prev => !prev);
  };

  /**
   * Handle auto-login after registration
   */
  const handleLogin = async () => {
    setIsLoading(true);
    
    try {
      await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        callbackUrl: '/dashboard',
      });
    } catch (error) {
      console.error('Auto-login failed:', error);
    }
  };

  // Show success message after registration
  if (success) {
    return (
      <Paper elevation={3} sx={{ p: 4, maxWidth: 480, width: '100%', mx: 'auto' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom fontWeight="bold">
          Registration Successful!
        </Typography>
        
        <Alert severity="success" sx={{ mb: 3 }}>
          Your account has been created successfully. Please check your email to verify your account.
        </Alert>
        
        <Typography variant="body1" paragraph>
          A verification link has been sent to <strong>{formData.email}</strong>. Please check your inbox and click the link to activate your account.
        </Typography>
        
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleLogin}
          disabled={isLoading}
          sx={{ 
            py: 1.5,
            mt: 2,
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
            'Continue to Login'
          )}
        </Button>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 480, width: '100%', mx: 'auto' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom fontWeight="bold">
        Create an Account
      </Typography>
      
      <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
        Join our platform and get started
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
          id="name"
          label="Full Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name || ' '}
          disabled={isLoading}
        />
        
        <TextField 
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
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
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password || 'Must be at least 8 characters'}
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
        
        <TextField 
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          id="confirmPassword"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword || ' '}
          disabled={isLoading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleToggleConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <FormControlLabel
          control={
            <Checkbox 
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              color="primary"
              disabled={isLoading}
            />
          }
          label={
            <Typography variant="body2">
              I agree to the {' '}
              <MuiLink
                component={Link}
                href="/terms"
                underline="hover"
              >
                Terms of Service
              </MuiLink>
              {' '} and {' '}
              <MuiLink
                component={Link}
                href="/privacy"
                underline="hover"
              >
                Privacy Policy
              </MuiLink>
            </Typography>
          }
          sx={{ mt: 2 }}
        />
        {errors.acceptTerms && (
          <Typography color="error" variant="caption" sx={{ display: 'block', ml: 2 }}>
            {errors.acceptTerms}
          </Typography>
        )}
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          sx={{ 
            py: 1.5,
            mt: 3,
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
            'Sign Up'
          )}
        </Button>
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <MuiLink
              component={Link}
              href="/auth/signin"
              variant="body2"
              fontWeight="bold"
              underline="hover"
            >
              Sign In
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default RegisterForm;