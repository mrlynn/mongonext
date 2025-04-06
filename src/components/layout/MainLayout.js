/**
 * @file Main layout component with responsive sidebar, navbar and footer
 * @module components/layout/MainLayout
 */

'use client';

import React, { useState } from 'react';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

/**
 * Main application layout with responsive sidebar
 * Provides the primary layout structure for the application
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be rendered in the main area
 * @returns {React.ReactElement} The layout component
 * 
 * @example
 * // Basic usage in a Next.js layout file
 * export default function DashboardLayout({ children }) {
 *   return <MainLayout>{children}</MainLayout>;
 * }
 */
const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  /**
   * Toggle the sidebar visibility state
   * @function
   */
  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top navigation bar */}
      <Navbar toggleSidebar={toggleSidebar} />
      
      <Box sx={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* Side navigation */}
        <Sidebar 
          open={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        {/* Main content area */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            p: 3,
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            ...(sidebarOpen && !isMobile && {
              marginLeft: '0',
              transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }),
          }}
        >
          <Container maxWidth="lg" sx={{ py: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
      
      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default MainLayout;