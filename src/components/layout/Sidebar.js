// src/components/layout/Sidebar.js
'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Collapse,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';

// Import icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Navigation items with updated paths
const navigationItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/admin', // Updated path
  },
  {
    text: 'Events',
    icon: <EventIcon />,
    path: '/admin/events', // Updated path
    children: [
      { text: 'All Events', path: '/admin/events' },
      { text: 'Create Event', path: '/admin/events/create' },
      { text: 'My Events', path: '/admin/events/my-events' },
    ]
  },
  {
    text: 'Teams',
    icon: <GroupWorkIcon />,
    path: '/admin/teams', // Updated path
    children: [
      { text: 'All Teams', path: '/admin/teams' },
      { text: 'Create Team', path: '/admin/teams/create' },
      { text: 'My Teams', path: '/admin/teams/my-teams' },
    ]
  },
  {
    text: 'Users',
    icon: <PeopleIcon />,
    path: '/admin/users', // Updated path
    children: [
      { text: 'All Users', path: '/admin/users' },
      { text: 'Invite User', path: '/admin/users/invite' },
    ]
  },
  {
    text: 'Settings',
    icon: <SettingsIcon />,
    path: '/admin/settings', // Updated path
  },
];

const Sidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  
  // Track which nested menus are open
  const [openMenus, setOpenMenus] = useState({});
  
  const handleMenuToggle = (text) => {
    setOpenMenus(prev => ({
      ...prev,
      [text]: !prev[text]
    }));
  };
  
  // Check if a path matches the current path or is a parent of it
  const isActive = (path) => {
    if (path === '/admin' && pathname === '/admin') {
      return true;
    }
    return pathname.startsWith(path) && path !== '/admin';
  };
  
  // Check if this item or any of its children is active
  const isItemActive = (item) => {
    if (isActive(item.path)) return true;
    if (item.children) {
      return item.children.some(child => isActive(child.path));
    }
    return false;
  };

  const drawerWidth = 240;
  
  const drawerContent = (
    <>
      {isMobile && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={onClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      )}
      <Divider />
      <List sx={{ width: '100%', pt: 0 }}>
        {navigationItems.map((item) => (
          <React.Fragment key={item.text}>
            {item.children ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => handleMenuToggle(item.text)}
                    selected={isItemActive(item)}
                    sx={{ 
                      pl: 2,
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)', // Subtle highlight
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.12)',
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 4,
                          backgroundColor: 'primary.main',
                          borderTopRightRadius: 4,
                          borderBottomRightRadius: 4,
                        }
                      }
                    }}
                  >
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                    {openMenus[item.text] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openMenus[item.text]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItem key={child.text} disablePadding>
                        <ListItemButton 
                          component={Link}
                          href={child.path}
                          selected={isActive(child.path)}
                          sx={{ 
                            pl: 6,
                            '&.Mui-selected': {
                              backgroundColor: 'rgba(25, 118, 210, 0.08)',
                              '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.12)',
                              },
                            }
                          }}
                        >
                          <ListItemText primary={child.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton 
                  component={Link}
                  href={item.path}
                  selected={isActive(item.path)}
                  sx={{ 
                    pl: 2,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.12)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        backgroundColor: 'primary.main',
                        borderTopRightRadius: 4,
                        borderBottomRightRadius: 4,
                      }
                    }
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { 
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Box
      component="nav"
      sx={{ 
        width: { md: open ? drawerWidth : 0 },
        flexShrink: 0,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'static',
            height: '100%',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;