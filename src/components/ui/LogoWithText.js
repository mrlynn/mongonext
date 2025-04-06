// src/components/ui/LogoWithText.jsx
'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useThemeContext } from '@/contexts/ThemeContext';
import Logo from './Logo';

const LogoWithText = ({ width = 40, height = 40, fontSize = '1.5rem', ...props }) => {
  const { mode } = useThemeContext();
  const textColor = mode === 'dark' ? 'white' : 'black';
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...props.sx }}>
      <Logo width={width} height={height} />
      <Typography 
        variant="h6" 
        component="span" 
        sx={{ 
          ml: 1.5, 
          fontWeight: 700, 
          fontSize, 
          color: textColor
        }}
      >
        MongoNext
      </Typography>
    </Box>
  );
};

export default LogoWithText;