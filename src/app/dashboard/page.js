/**
 * @file Dashboard page
 * @module app/dashboard/page
 */

'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Button, 
  Card, 
  CardContent, 
  CardActions,
  Avatar, 
  Divider,
  Skeleton,
  Stack,
} from '@mui/material';
import { signOut } from 'next-auth/react';
import { useSessionContext } from '@/contexts/SessionContext';

/**
 * Dashboard page component
 * This page is protected by middleware, only accessible to authenticated users
 * 
 * @component
 * @returns {React.ReactElement} Dashboard page component
 */
export default function DashboardPage() {
  const { user, isLoading } = useSessionContext();
  
  // Handle sign out
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };
  
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Skeleton variant="circular" width={80} height={80} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="40%" height={20} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={120} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2 }} />
              <Stack direction="row" spacing={2}>
                <Skeleton variant="rounded" width={100} height={36} />
                <Skeleton variant="rounded" width={100} height={36} />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={4}>
        {/* User Profile Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar 
                sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}
                src={user?.profileImage || undefined}
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {user?.name || 'User'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email || 'email@example.com'}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" gutterBottom color="text.secondary">
              User Details
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" component="div">
                <strong>Role:</strong> {user?.role || 'user'}
              </Typography>
              <Typography variant="body2" component="div">
                <strong>Verified:</strong> {user?.isVerified ? 'Yes' : 'No'}
              </Typography>
              <Typography variant="body2" component="div">
                <strong>ID:</strong> {user?.id || 'N/A'}
              </Typography>
            </Box>
            
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth
              href="/profile"
            >
              Edit Profile
            </Button>
          </Paper>
        </Grid>
        
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Welcome Back!
            </Typography>
            <Typography variant="body1" paragraph>
              This is your personal dashboard in the MongoNext template. This page is protected and only accessible to authenticated users. You can use this template to build your application with a complete user management system.
            </Typography>
            <Typography variant="body1" paragraph>
              The session information is accessible throughout the application via the SessionContext. Your authentication status, user details, and role are all available for building personalized experiences.
            </Typography>
            
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button variant="contained" href="/admin">
                Admin Panel
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </Box>
          </Paper>
          
          {/* Example Cards */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    User Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Complete user authentication with email verification, password reset, and profile management.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href="/profile">My Profile</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    MongoDB Integration
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Built-in MongoDB connection with Mongoose models and optimized database access.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href="/admin/users">User Data</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}