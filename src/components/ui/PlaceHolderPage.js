// src/components/ui/PlaceholderPage.js
import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';

const PlaceholderPage = ({ title, description, icon }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
        {icon && <Box sx={{ mr: 1 }}>{icon}</Box>}
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {description}
      </Typography>
      
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4, 
          textAlign: 'center',
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: 2
        }}
      >
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          This page is under construction
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          This is a placeholder for the {title.toLowerCase()} functionality.
        </Typography>
        <Button variant="outlined">Coming Soon</Button>
      </Paper>
    </Box>
  );
};

export default PlaceholderPage;