'use client';

import { useState } from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemButton,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  TextField,
  InputAdornment,
  Button,
  Stack
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import LogoWithText from '@/components/ui/LogoWithText';

const drawerWidth = 280;

/**
 * Documentation layout component that provides a sidebar navigation and content area
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display in the main area
 */
export default function DocsLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Documentation navigation structure
  const docsNav = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Quick Start Guide', path: '/docs/getting-started/quickstart' },
        { title: 'Prerequisites', path: '/docs/getting-started/prerequisites' },
        { title: 'Installation', path: '/docs/getting-started/installation' },
        { title: 'Plop Tutorial', path: '/docs/getting-started/plop-tutorial' }
      ]
    },
    {
      title: 'Architecture',
      items: [
        { title: 'Overview', path: '/docs/architecture/overview' },
        { title: 'Database Schema', path: '/docs/architecture/database' },
        { title: 'Authentication', path: '/docs/architecture/auth' },
        { title: 'Component System', path: '/docs/architecture/components' }
      ]
    },
    {
      title: 'Development',
      items: [
        { title: 'Workflows', path: '/docs/development/workflows' },
        { title: 'Testing', path: '/docs/development/testing' },
        { title: 'Code Generation', path: '/docs/development/code-generation' },
        { title: 'Styling Guide', path: '/docs/development/styling' }
      ]
    },
    {
      title: 'API',
      items: [
        { title: 'Overview', path: '/docs/api/overview' },
        { title: 'Authentication', path: '/docs/api/authentication' },
        { title: 'Models', path: '/docs/api/models' },
        { title: 'Error Handling', path: '/docs/api/errors' }
      ]
    },
    {
      title: 'Deployment',
      items: [
        { title: 'Guide', path: '/docs/deployment/guide' },
        { title: 'Configuration', path: '/docs/deployment/configuration' },
        { title: 'Monitoring', path: '/docs/deployment/monitoring' },
        { title: 'Security', path: '/docs/deployment/security' }
      ]
    }
  ];

  // Filter navigation based on search query
  const filteredNav = docsNav.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search documentation..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          size="small"
        />
      </Box>
      <Divider />
      <List>
        {filteredNav.map((section) => (
          <Box key={section.title}>
            <ListItem>
              <ListItemText 
                primary={section.title} 
                primaryTypographyProps={{ 
                  variant: 'subtitle1', 
                  fontWeight: 'bold',
                  color: 'primary'
                }} 
              />
            </ListItem>
            {section.items.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton 
                  component={Link} 
                  href={item.path}
                  selected={pathname === item.path}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider',
          boxShadow: 'none'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box 
              component={Link} 
              href="/" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                textDecoration: 'none', 
                color: 'inherit' 
              }}
            >
              {isMobile ? <Logo /> : <LogoWithText />}
            </Box>
            <Typography 
              variant="subtitle1" 
              noWrap 
              component="div"
              sx={{ 
                borderLeft: 1, 
                borderColor: 'divider',
                pl: 2,
                color: 'text.secondary'
              }}
            >
              Documentation
            </Typography>
          </Stack>
          
          <Stack direction="row" spacing={2}>
            <Button
              component={Link}
              href="/docs"
              color="inherit"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Docs
            </Button>
            <Button
              component={Link}
              href="/examples"
              color="inherit"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Examples
            </Button>
            <Button
              component={Link}
              href="/"
              color="inherit"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Back to App
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: 1,
              borderColor: 'divider'
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: 1,
              borderColor: 'divider'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          mt: '64px'  // Height of AppBar
        }}
      >
        {children}
      </Box>
    </Box>
  );
} 