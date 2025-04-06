'use client';

import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  Box, 
  useMediaQuery, 
  useTheme,
  ListItemIcon,
  Divider,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useThemeContext } from '../../contexts/ThemeContext';
import Logo from '@/components/ui/Logo';
import LogoWithText from '@/components/ui/LogoWithText';
import { signOut, useSession } from 'next-auth/react';

const Navbar = ({ toggleSidebar }) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const pathname = usePathname();
  
  // Use NextAuth session instead of hardcoded values
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const user = session?.user || { name: 'Guest', email: '', avatar: null };
  const isDarkMode = theme.palette.mode === 'dark';
  
  // Profile menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    handleMenuClose();
    // Use NextAuth signOut function with callback URL
    signOut({ callbackUrl: '/auth/signin' });
  };

  return (
    <AppBar position="static" elevation={1} color="default">
      <Toolbar>
        {isAuthenticated && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 700
          }}
        >
<Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
  {!isMobile ? (
    <LogoWithText width={32} height={32} />
  ) : (
    <Logo width={32} height={32} />
  )}
</Link>
        </Typography>
        
        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Toggle theme">
              <IconButton onClick={toggleTheme} sx={{ mr: 1 }}>
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Notifications">
              <IconButton sx={{ mr: 2 }}>
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleMenuOpen}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                {user.avatar ? (
                  <Avatar 
                    src={user.avatar} 
                    alt={user.name}
                    sx={{ width: 32, height: 32 }}
                  />
                ) : (
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                    {user.name.charAt(0)}
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 3,
                sx: {
                  minWidth: 200,
                  mt: 1,
                  '& .MuiMenuItem-root': {
                    py: 1,
                  },
                },
              }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
              
              <Divider />
              
              <MenuItem onClick={() => { handleMenuClose(); router.push('/profile'); }}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              
              <MenuItem onClick={() => { handleMenuClose(); router.push('/settings'); }}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              
              <Divider />
              
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button 
              color="primary" 
              variant={pathname === '/auth/signin' ? 'outlined' : 'text'} 
              component={Link} 
              href="/auth/signin"
              sx={{ mx: 1 }}
            >
              Sign In
            </Button>
            <Button 
              color="primary" 
              variant="contained" 
              component={Link} 
              href="/auth/signup"
              sx={{ ml: 1 }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;