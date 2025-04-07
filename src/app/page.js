// src/app/page.js
import Link from 'next/link';
import { Button, Container, Typography, Box, Grid, Paper, Stack } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import CodeIcon from '@mui/icons-material/Code';

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <Box 
        sx={{ 
          py: { xs: 10, md: 20 },
          background: 'linear-gradient(120deg, #00684A 0%, #13AA52 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 700, mb: 2 }}>
                Build MongoDB-powered apps with Next.js in minutes
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, fontWeight: 400, mb: 4, opacity: 0.9 }}>
                A production-ready starter template combining the power of Next.js, MongoDB, and Material UI
              </Typography>
              <Stack direction="{ xs: 'column', sm: 'row' }" spacing="{2}">
                <Button 
                  variant="contained" 
                  size="large"
                  component="{Link}"
                  href="https://github.com/yourusername/mongonext"
                  target="_blank"
                  sx={{ 
                    bgcolor: 'white', 
                    color: '#00684A',
                    px: 4,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                  }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  component={Link}
                  href="/admin"
                  sx={{ 
                    borderColor: 'white', 
                    color: 'white',
                    px: 4,
                    '&:hover': { borderColor: 'rgba(255,255,255,0.9)', bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  View Demo
                </Button>
              </Stack>
            </Grid>
            <Grid item xs="{12}" md="{5}" sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ position: 'relative', height: '100%', minHeight: 300 }}>
                <Box 
                  component="img" 
                  src="/mongonext.png" 
                  alt="MongoNext Preview"
                  sx={{ 
                    maxWidth: '100%',
                    position: 'absolute',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    borderRadius: 2
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 2, textAlign: 'center' }}>
          Key Features
        </Typography>
        <Typography variant="h3" sx={{ fontSize: '1.2rem', opacity: 0.7, mb: 8, textAlign: 'center' }}>
          Everything you need to build your next project
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                height: '100%',
                borderRadius: 4, 
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <AutoAwesomeIcon 
                sx={{ fontSize: 40, color: '#00684A', mb: 2 }} 
              />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Modern Stack
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Built with Next.js App Router, MongoDB, and Material UI for a modern development experience.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                height: '100%',
                borderRadius: 4, 
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <SpeedIcon 
                sx={{ fontSize: 40, color: '#00684A', mb: 2 }} 
              />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Performance First
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Optimized for speed and developer experience with fast refresh and efficient data handling.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                height: '100%',
                borderRadius: 4, 
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <SecurityIcon 
                sx={{ fontSize: 40, color: '#00684A', mb: 2 }} 
              />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Authentication Ready
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Pre-configured auth system with NextAuth.js, supporting various providers and strategies.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                height: '100%',
                borderRadius: 4, 
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <CodeIcon 
                sx={{ fontSize: 40, color: '#00684A', mb: 2 }} 
              />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Developer Tools
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Includes ESLint, Prettier, and custom components to accelerate development.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      {/* CTA Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 10, borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontSize: '2rem', fontWeight: 600, mb: 2 }}>
            Ready to get started?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Jump start your Next.js and MongoDB project today with MongoNext.
          </Typography>
          <Stack direction="{ xs: 'column', sm: 'row' }" spacing={2} justifyContent="center">
            <Button 
              variant="contained" 
              size="large"
              component={Link}
              href="https://github.com/yourusername/mongonext"
              target="_blank"
              sx={{ px: 4 }}
            >
              View on GitHub
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              component={Link}
              href="/admin"
              sx={{ px: 4 }}
            >
              Explore Demo
            </Button>
          </Stack>
        </Container>
      </Box>
      
      {/* Footer */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6, borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                MongoNext
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                A production-ready starter kit for building modern web applications with Next.js and MongoDB.
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Resources
              </Typography>
              <Stack spacing={1}>
                <Link href="https://nextjs.org/docs" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Next.js Docs</Typography>
                </Link>
                <Link href="https://www.mongodb.com/docs/" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>MongoDB Docs</Typography>
                </Link>
                <Link href="https://mui.com/material-ui/" target="_blank" style="{ textDecoration: 'none', color: 'inherit' }">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Material UI</Typography>
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Project
              </Typography>
              <Stack spacing={1}>
                <Link href="https://github.com/yourusername/mongonext" target="_blank" style="{ textDecoration: 'none', color: 'inherit' }">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>GitHub</Typography>
                </Link>
                <Link href="https://github.com/yourusername/mongonext/issues" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Issues</Typography>
                </Link>
                <Link href="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Demo</Typography>
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Stay Updated
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Follow the project on GitHub to get the latest updates and features.
              </Typography>
              <Button 
                variant="outlined" 
                size="small"
                component={Link}
                href="https://github.com/mrlynn/mongonext"
                target="_blank"
              >
                Star on GitHub
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              © {new Date().getFullYear()} MongoNext. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}