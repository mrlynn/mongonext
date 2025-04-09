'use client';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
  Collapse
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  
  // Track open state for each menu item separately
  const [openMenus, setOpenMenus] = useState(() => {
    // Initialize open state based on current path
    const initial = {};
    if (pathname.startsWith('/admin/users')) initial.users = true;
    if (pathname.startsWith('/admin/products')) initial.products = true;
    return initial;
  });

  const drawerWidth = 240;

  const isActive = (path) => pathname === path;
  const isGroupActive = (path) => pathname.startsWith(path);

  const navigationItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/admin',
    },
    {
      text: 'User Management',
      icon: <PeopleIcon />,
      path: '/admin/users',
      children: [
        { text: 'All Users', path: '/admin/users', icon: <PeopleIcon /> },
        { text: 'Invite User', path: '/admin/users/invite', icon: <PersonAddIcon /> },
      ],
    },
    // You can add more sections here as needed
  ];

  const handleToggleMenu = (menuKey) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const drawerContent = (
    <>
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={onClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      )}
      <Divider />
      <List>
        {navigationItems.map((item) => (
          item.children ? (
            <React.Fragment key={item.text}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleToggleMenu(item.text.toLowerCase().replace(/\s+/g, ''))}
                  selected={isGroupActive(item.path)}
                  sx={{
                    pl: 2,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.12)',
                      },
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {openMenus[item.text.toLowerCase().replace(/\s+/g, '')] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse 
                in={openMenus[item.text.toLowerCase().replace(/\s+/g, '')]} 
                timeout="auto" 
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItemButton
                      key={child.text}
                      component={Link}
                      href={child.path}
                      selected={isActive(child.path)}
                      sx={{
                        pl: 4,
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
                          },
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>{child.icon}</ListItemIcon>
                      <ListItemText primary={child.text} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ) : (
            <ListItem disablePadding key={item.text}>
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
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          )
        ))}
      </List>
    </>
  );

  return isMobile ? (
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
  ) : (
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
        variant="permanent"
        open={open}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
            backgroundColor: 'background.paper',
            boxShadow: 1,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;