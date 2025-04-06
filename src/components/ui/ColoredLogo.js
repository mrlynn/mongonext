// src/components/ui/ColoredLogo.jsx
'use client';

import React from 'react';
import { useThemeContext } from '@/contexts/ThemeContext';

const ColoredLogo = ({ color, width = 100, height = 120, ...props }) => {
  const { mode } = useThemeContext();
  
  // If no color is specified, use theme-appropriate colors
  const logoColor = color || (mode === 'dark' ? 'white' : 'black');
  
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 120"
      width={width} 
      height={height}
      {...props}
    >
      {/* Leaf shape */}
      <path 
        d="M50,10 C25,10 10,40 10,70 C10,90 25,110 50,110 C75,110 50,70 50,40 L50,110" 
        fill="none" 
        stroke={logoColor} 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Arrow */}
      <path 
        d="M50,40 L90,40 M80,30 L90,40 L80,50" 
        fill="none" 
        stroke={logoColor} 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

export default ColoredLogo;