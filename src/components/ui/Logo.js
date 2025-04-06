// src/components/ui/Logo.jsx
'use client';

import React from 'react';
import Image from 'next/image';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Box } from '@mui/material';

const Logo = ({ width = 40, height = 40, ...props }) => {
  const { mode } = useThemeContext();
  
  // Select the appropriate SVG based on theme mode
  const logoSrc = mode === 'dark' 
    ? '/logo_50x50.png' 
    : '/logo_50x50.png';
  
  return (
    <Box
      component="img"
      src={logoSrc}
      alt="MongoNext Logo"
      width={width}
      height={height}
      sx={{ ...props.sx }}
    />
  );
};

export default Logo;