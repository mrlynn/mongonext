/**
 * @file App providers for theme, authentication, and session
 * @module app/providers
 */

'use client';

import React from 'react';
import { ThemeProvider, useThemeContext } from '../contexts/ThemeContext';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { SessionProvider } from '../contexts/SessionContext';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Snackbar, Alert } from '@mui/material';

/**
 * Theme Configuration Component that uses the theme context
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement} Themed component
 */
const ThemeConfigurator = ({ children }) => {
  const { mode } = useThemeContext();
  
  // Create a theme instance with light/dark mode
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#00684A', // MongoDB green
        light: '#00A873',
        dark: '#004D40',
      },
      secondary: {
        main: '#13AA52', // MongoDB accent green
        light: '#5DD39E',
        dark: '#105B34',
      },
      ...(mode === 'dark' ? {
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
      } : {
        background: {
          default: '#f5f5f5',
          paper: '#ffffff',
        },
      }),
    },
    typography: {
      fontFamily: 'var(--font-geist-sans)',
      h1: {
        fontWeight: 600,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            padding: '8px 16px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'dark' 
              ? '0 4px 8px rgba(0, 0, 0, 0.4)' 
              : '0 4px 8px rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'dark' 
              ? '0 1px 3px rgba(0, 0, 0, 0.4)' 
              : '0 1px 3px rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 600,
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: mode === 'dark' ? '#333' : '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: mode === 'dark' ? '#888' : '#c1c1c1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: mode === 'dark' ? '#555' : '#a1a1a1',
            },
          },
        },
      },
    },
    // Custom shared variables that aren't part of the Material UI spec
    custom: {
      contentPadding: {
        xs: 16,
        sm: 24,
        md: 32,
      },
      cardGradient: mode === 'dark'
        ? 'linear-gradient(45deg, #1a1a1a 0%, #2c2c2c 100%)'
        : 'linear-gradient(45deg, #ffffff 0%, #f9f9f9 100%)',
    },
  });

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

/**
 * Notification provider for displaying alerts
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement} Component with notification functionality
 */
const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = React.useState({ open: false, message: '', severity: 'info' });
  
  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };
  
  const hideNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };
  
  // Add the notification function to the window object for global access
  React.useEffect(() => {
    window.showNotification = showNotification;
    return () => {
      delete window.showNotification;
    };
  }, []);
  
  return (
    <>
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={hideNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={hideNotification} 
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

/**
 * Main application providers component
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement} Wrapped application with all providers
 */
export function Providers({ children }) {
  return (
    <NextAuthSessionProvider>
      <SessionProvider>
        <ThemeProvider>
          <ThemeConfigurator>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </ThemeConfigurator>
        </ThemeProvider>
      </SessionProvider>
    </NextAuthSessionProvider>
  );
}