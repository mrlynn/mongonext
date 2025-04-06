/**
 * @file User profile page
 * @module app/profile/page
 */

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Grid,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import { CameraAlt as CameraIcon } from '@mui/icons-material';
import { useSessionContext } from '@/contexts/SessionContext';
import { updateProfile, changePassword } from '@/lib/auth/auth.service';

/**
 * User profile page component
 * 
 * @component
 * @returns {React.ReactElement} Profile page component
 */
export default function ProfilePage() {
  const { user, isLoading: sessionLoading } = useSessionContext();
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    profileImage: '',
  });
  
  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // Errors for form validation
  const [errors, setErrors] = useState({});
  
  // Load user data when available
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        profileImage: user.profileImage || '',
      });
    }
  }, [user]);
  
  /**
   * Handle tab change
   * @param {React.SyntheticEvent} event - Tab change event
   * @param {number} newValue - New tab index
   */
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Clear messages when switching tabs
    setSuccess('');
    setError('');
  };
  
  /**
   * Handle profile form input changes
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear messages
    setSuccess('');
    setError('');
  };
  
  /**
   * Handle password form input changes
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear messages
    setSuccess('');
    setError('');
  };
  
  /**
   * Validate profile form
   * @returns {boolean} True if form is valid
   */
  const validateProfileForm = () => {
    const newErrors = {};
    
    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (profileData.profileImage && !/^(https?:\/\/)/.test(profileData.profileImage)) {
      newErrors.profileImage = 'Profile image must be a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  /**
   * Validate password form
   * @returns {boolean} True if form is valid
   */
  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  /**
   * Handle profile form submission
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateProfileForm()) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await updateProfile(profileData);
      
      if (result.success) {
        setSuccess('Profile updated successfully!');
        
        // Update local state with server response if provided
        if (result.data) {
          setProfileData({
            name: result.data.name || profileData.name,
            email: result.data.email || profileData.email,
            profileImage: result.data.profileImage || profileData.profileImage,
          });
        }
      } else {
        setError(result.message || 'Failed to update profile');
      }
    } catch (error) {
      setError('An error occurred while updating your profile');
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Handle password form submission
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      
      if (result.success) {
        setSuccess('Password changed successfully!');
        // Reset form
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        setError(result.message || 'Failed to change password');
      }
    } catch (error) {
      setError('An error occurred while changing your password');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Show loading state while session is loading
  if (sessionLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Profile
      </Typography>
      
      <Paper sx={{ mt: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            aria-label="profile tabs"
          >
            <Tab label="Profile Information" />
            <Tab label="Change Password" />
          </Tabs>
        </Box>
        
        {/* Profile Information Tab */}
        <Box role="tabpanel" hidden={activeTab !== 0} sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Box component="form" onSubmit={handleProfileSubmit} noValidate>
              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {success}
                </Alert>
              )}
              
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ position: 'relative' }}>
                      <Avatar
                        src={profileData.profileImage || undefined}
                        sx={{ width: 120, height: 120, mb: 2 }}
                      >
                        {profileData.name?.charAt(0).toUpperCase() || 'U'}
                      </Avatar>
                      <IconButton
                        sx={{
                          position: 'absolute',
                          bottom: 16,
                          right: 0,
                          bgcolor: 'background.paper',
                          boxShadow: 1,
                          '&:hover': { bgcolor: 'background.paper' },
                        }}
                        disabled={true} // Enable when implementing image upload
                      >
                        <CameraIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Upload a new avatar
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={8}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    error={!!errors.name}
                    helperText={errors.name || ' '}
                    disabled={isLoading}
                  />
                  
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={profileData.email}
                    disabled={true} // Email changes require verification
                    helperText="Email changes require re-verification"
                  />
                  
                  <TextField
                    margin="normal"
                    fullWidth
                    id="profileImage"
                    label="Profile Image URL"
                    name="profileImage"
                    placeholder="https://example.com/your-image.jpg"
                    value={profileData.profileImage}
                    onChange={handleProfileChange}
                    error={!!errors.profileImage}
                    helperText={errors.profileImage || 'Enter a URL to your profile image'}
                    disabled={isLoading}
                  />
                  
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      sx={{ position: 'relative' }}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} sx={{ position: 'absolute' }} color="inherit" />
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
        
        {/* Change Password Tab */}
        <Box role="tabpanel" hidden={activeTab !== 1} sx={{ p: 3 }}>
          {activeTab === 1 && (
            <Box component="form" onSubmit={handlePasswordSubmit} noValidate>
              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {success}
                </Alert>
              )}
              
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="currentPassword"
                label="Current Password"
                type="password"
                id="currentPassword"
                autoComplete="current-password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                error={!!errors.currentPassword}
                helperText={errors.currentPassword || ' '}
                disabled={isLoading}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                autoComplete="new-password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                error={!!errors.newPassword}
                helperText={errors.newPassword || 'Must be at least 8 characters'}
                disabled={isLoading}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword || ' '}
                disabled={isLoading}
              />
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  sx={{ position: 'relative' }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} sx={{ position: 'absolute' }} color="inherit" />
                  ) : (
                    'Change Password'
                  )}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}