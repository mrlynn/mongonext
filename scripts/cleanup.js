#!/usr/bin/env node

/**
 * This script allows you to easily remove demonstration features from the MongoNext template
 * Run with: npm run cleanup
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define the demo features that can be removed
const demoFeatures = {
  events: {
    name: 'Events',
    description: 'Demo event management pages and components',
    paths: [
      'src/app/admin/events',
      'src/components/ui/events', // If this exists
    ]
  },
  teams: {
    name: 'Teams',
    description: 'Demo team management pages and components',
    paths: [
      'src/app/admin/teams',
      'src/components/ui/teams', // If this exists
    ]
  },
  users: {
    name: 'Users Admin',
    description: 'Demo user management admin pages (keeps auth system)',
    paths: [
      'src/app/admin/users',
    ]
  },
  settings: {
    name: 'Settings',
    description: 'Demo settings pages',
    paths: [
      'src/app/admin/settings',
    ]
  },
  adminDashboard: {
    name: 'Admin Dashboard',
    description: 'Demo admin dashboard with charts and stats',
    paths: [
      'src/app/admin/page.js',
    ]
  },
  all: {
    name: 'All Demo Features',
    description: 'Remove all demonstration features',
    // This will be compiled from all the above
    paths: []
  }
};

// Compile the "all" paths
demoFeatures.all.paths = Object.keys(demoFeatures)
  .filter(key => key !== 'all')
  .flatMap(key => demoFeatures[key].paths);

// Function to safely delete a file or directory
function safeDelete(path) {
  if (fs.existsSync(path)) {
    if (fs.lstatSync(path).isDirectory()) {
      fs.rmSync(path, { recursive: true, force: true });
    } else {
      fs.unlinkSync(path);
    }
    return true;
  }
  return false;
}

// Function to update the sidebar navigation to remove demo links
function updateSidebarNavigation(removedFeatures) {
  const sidebarPath = path.join(process.cwd(), 'src/components/layout/Sidebar.js');
  
  if (!fs.existsSync(sidebarPath)) {
    console.log('Sidebar component not found. Navigation was not updated.');
    return;
  }
  
  try {
    let sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
    
    // Get the names of features to remove
    const featureNames = removedFeatures
      .filter(feature => feature !== 'all')
      .map(feature => demoFeatures[feature].name);
    
    if (featureNames.length === 0) {
      return;
    }
    
    // Instead of using regex, we'll use a more reliable approach
    // First, let's create a minimal valid Sidebar.js with just the Dashboard item
    const minimalSidebar = `// src/components/layout/Sidebar.js
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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Navigation items with updated paths
const navigationItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/admin', // Updated path
  }
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

export default Sidebar;`;
    
    // Write the minimal sidebar back to the file
    fs.writeFileSync(sidebarPath, minimalSidebar);
    console.log('Updated sidebar navigation to remove demo links.');
  } catch (error) {
    console.error('Error updating sidebar navigation:', error);
  }
}

// Function to update the package.json to add the cleanup script
function addCleanupScriptToPackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log('package.json not found.');
    return;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Add the cleanup script if it doesn't exist
    if (!packageJson.scripts.cleanup) {
      packageJson.scripts.cleanup = 'node scripts/cleanup.js';
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('Added cleanup script to package.json');
    }
  } catch (error) {
    console.error('Error updating package.json:', error);
  }
}

// Main function
async function main() {
  console.log('\n🧹 MongoNext Template Cleanup Tool 🧹\n');
  console.log('This tool helps you remove demonstration features from the template.');
  console.log('Select which features you want to remove:\n');
  
  // Display options
  Object.keys(demoFeatures).forEach((key, index) => {
    console.log(`${index + 1}. ${demoFeatures[key].name} - ${demoFeatures[key].description}`);
  });
  
  // Get user selection
  const promptSelection = () => {
    return new Promise((resolve) => {
      rl.question('\nEnter the numbers of features to remove (comma-separated) or "q" to quit: ', (answer) => {
        if (answer.toLowerCase() === 'q') {
          resolve([]);
          return;
        }
        
        const selections = answer
          .split(',')
          .map(s => s.trim())
          .filter(s => s !== '')
          .map(s => parseInt(s, 10) - 1)
          .filter(n => !isNaN(n) && n >= 0 && n < Object.keys(demoFeatures).length)
          .map(n => Object.keys(demoFeatures)[n]);
        
        if (selections.length === 0) {
          console.log('Invalid selection. Please try again.');
          resolve(promptSelection());
        } else {
          resolve(selections);
        }
      });
    });
  };
  
  const selectedFeatures = await promptSelection();
  
  if (selectedFeatures.length === 0) {
    console.log('No features selected. Exiting...');
    rl.close();
    return;
  }
  
  // Confirm deletion
  rl.question(`\nAre you sure you want to remove ${selectedFeatures.map(f => demoFeatures[f].name).join(', ')}? (y/n): `, (answer) => {
    if (answer.toLowerCase() !== 'y') {
      console.log('Operation cancelled.');
      rl.close();
      return;
    }
    
    console.log('\nRemoving selected features...');
    
    // Process "all" selection specially
    if (selectedFeatures.includes('all')) {
      selectedFeatures.length = 0;
      selectedFeatures.push(...Object.keys(demoFeatures).filter(key => key !== 'all'));
    }
    
    // Delete the files/directories
    let deletedCount = 0;
    const failedPaths = [];
    
    selectedFeatures.forEach(feature => {
      demoFeatures[feature].paths.forEach(p => {
        const fullPath = path.join(process.cwd(), p);
        if (safeDelete(fullPath)) {
          console.log(`✓ Removed: ${p}`);
          deletedCount++;
        } else {
          failedPaths.push(p);
        }
      });
    });
    
    // Update the sidebar navigation
    updateSidebarNavigation(selectedFeatures);
    
    console.log(`\nRemoved ${deletedCount} files/directories.`);
    
    if (failedPaths.length > 0) {
      console.log('\nThe following paths were not found:');
      failedPaths.forEach(p => console.log(`- ${p}`));
    }
    
    console.log('\n🎉 Cleanup complete! Your template is now ready for customization.');
    console.log('\nRun this script again any time with: npm run cleanup');
    
    rl.close();
  });
}

// Check if this script was executed directly
if (require.main === module) {
  // Add the cleanup script to package.json
  addCleanupScriptToPackageJson();
  main();
}

module.exports = { demoFeatures, safeDelete, updateSidebarNavigation };