import { getAllDocs } from '@/lib/docs/markdownLoader';
import DocsLayout from '@/components/layout/DocsLayout';
import { Box, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import Link from 'next/link';

/**
 * Documentation index page
 */
export default async function DocsPage() {
  const allDocs = await getAllDocs();
  
  // Group docs by category based on their path
  const docsByCategory = allDocs.reduce((acc, doc) => {
    const category = doc.path.split('/')[0] || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(doc);
    return acc;
  }, {});

  // Define display names for categories
  const categoryDisplayNames = {
    'getting-started': 'Getting Started',
    'architecture': 'Architecture',
    'development': 'Development',
    'api': 'API',
    'deployment': 'Deployment',
    'General': 'Overview'
  };

  return (
    <DocsLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Documentation
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Welcome to the MongoNext documentation. Here you'll find comprehensive guides and documentation to help you start working with MongoNext as quickly as possible.
        </Typography>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Quick Links
        </Typography>
        <Grid container spacing={2}>
          {[
            { title: 'Quick Start', path: '/docs/getting-started/quick-start' },
            { title: 'Architecture Overview', path: '/docs/architecture/overview' },
            { title: 'API Overview', path: '/docs/api/overview' },
            { title: 'Deployment Guide', path: '/docs/deployment/guide' }
          ].map((link) => (
            <Grid item xs={12} sm={6} md={3} key={link.path}>
              <Card>
                <CardActionArea component={Link} href={link.path}>
                  <CardContent>
                    <Typography variant="h6">{link.title}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {Object.entries(docsByCategory).map(([category, docs]) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            {categoryDisplayNames[category] || category}
          </Typography>
          <Grid container spacing={2}>
            {docs.map((doc) => (
              <Grid item xs={12} sm={6} md={4} key={doc.path}>
                <Card>
                  <CardActionArea component={Link} href={`/docs/${doc.path}`}>
                    <CardContent>
                      <Typography variant="h6">{doc.title}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </DocsLayout>
  );
} 