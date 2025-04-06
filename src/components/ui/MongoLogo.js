// src/components/ui/MongoLogo.jsx
import React from 'react';
import { Box } from '@mui/material';

const MongoLogo = ({ width = 40, height = 40, ...props }) => {
  // Assuming you have a green version saved as logo-mongo-green.svg
  // If not, you can use your black or white version and apply a color filter
  return (
    <Box
      component="img"
      src="/logo-circle-black-on-white.svg" // Your base logo
      alt="MongoNext Logo"
      width={width}
      height={height}
      sx={{ 
        filter: 'invert(18%) sepia(99%) saturate(3837%) hue-rotate(158deg) brightness(97%) contrast(101%)',
        // This filter approximately transforms black to MongoDB green
        ...props.sx 
      }}
    />
  );
};

export default MongoLogo;