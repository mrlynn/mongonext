'use client';

import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton, useTheme, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'FAQ', href: '/faq' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Cookie Policy', href: '/cookies' },
      ]
    }
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.900',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        {!isMobile ? (
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Your Application
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Creating opportunities for innovation through collaborative coding events.
                </Typography>
                <Box sx={{ display: 'flex', mt: 'auto' }}>
                  <IconButton aria-label="GitHub" component={MuiLink} href="https://github.com/mrlynn/mongonext" target="_blank" rel="noopener">
                    <GitHubIcon />
                  </IconButton>
                  <IconButton aria-label="LinkedIn" component={MuiLink} href="https://linkedin.com/in/mlynn" target="_blank" rel="noopener">
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton aria-label="Twitter" component={MuiLink} href="https://twitter.com/mlynn" target="_blank" rel="noopener">
                    <TwitterIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
            
            {footerLinks.map((section) => (
              <Grid item xs={6} md={2} key={section.title}>
                <Typography variant="subtitle1" color="text.primary" gutterBottom>
                  {section.title}
                </Typography>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {section.links.map((link) => (
                    <li key={link.name} style={{ marginBottom: '0.5rem' }}>
                    <MuiLink
                      component={Link}
                      href={link.href}
                      underline="hover"
                      color="text.secondary"
                      sx={{ '&:hover': { color: 'primary.main' } }}
                    >
                      {link.name}
                    </MuiLink>
                  </li>
                  ))}
                </ul>
              </Grid>
            ))}
            
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" color="text.primary" gutterBottom>
                Contact
              </Typography>
              <Typography variant="body2" color="text.secondary">
                info@example.com
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                123 Main Street<br />
                City, State 12345
              </Typography>
            </Grid>
          </Grid>
        ) : (
          // Mobile version with simplified layout
          <Box>
            <Typography variant="h6" color="text.primary" gutterBottom align="center">
              Your Application
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <IconButton aria-label="GitHub" component={MuiLink} href="https://github.com/mrlynn/mongonext" target="_blank" rel="noopener">
                <GitHubIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" component={MuiLink} href="https://linkedin.com/in/mlynn" target="_blank" rel="noopener">
                <LinkedInIcon />
              </IconButton>
              <IconButton aria-label="Twitter" component={MuiLink} href="https://twitter.com/mlynn" target="_blank" rel="noopener">
                <TwitterIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mb: 2 }}>
              <Link href="/features" passHref>
                <MuiLink underline="hover" color="text.secondary">Features</MuiLink>
              </Link>
              <Link href="/about" passHref>
                <MuiLink underline="hover" color="text.secondary">About</MuiLink>
              </Link>
              <Link href="/terms" passHref>
                <MuiLink underline="hover" color="text.secondary">Terms</MuiLink>
              </Link>
              <Link href="/privacy" passHref>
                <MuiLink underline="hover" color="text.secondary">Privacy</MuiLink>
              </Link>
            </Box>
          </Box>
        )}
        
        <Box sx={{ mt: 3, borderTop: '1px solid', borderColor: 'divider', pt: 2 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {currentYear} Your Application. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;