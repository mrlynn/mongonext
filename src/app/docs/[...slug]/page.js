import { loadMarkdownFile } from '@/lib/docs/markdownLoader';
import DocsLayout from '@/components/layout/DocsLayout';
import { Box, Typography, Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import MarkdownContent from '@/components/docs/MarkdownContent';

/**
 * Documentation page component
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 */
export default async function DocsPage({ params }) {
  // Get the slug from the params
  const slug = params.slug || ['index'];
  const filePath = slug.join('/') + '.md';
  
  // Load the markdown content
  const { content } = await loadMarkdownFile(filePath);
  
  // Generate breadcrumbs
  const breadcrumbs = [
    { label: 'Docs', path: '/docs' },
    ...slug.map((item, index) => {
      const path = `/docs/${slug.slice(0, index + 1).join('/')}`;
      const label = item.charAt(0).toUpperCase() + item.slice(1).replace(/-/g, ' ');
      return { label, path };
    })
  ];
  
  return (
    <DocsLayout>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return isLast ? (
              <Typography key={crumb.path} color="text.primary">
                {crumb.label}
              </Typography>
            ) : (
              <Link 
                key={crumb.path} 
                href={crumb.path}
                style={{ 
                  color: 'inherit',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                {crumb.label}
              </Link>
            );
          })}
        </Breadcrumbs>
      </Box>
      
      <MarkdownContent content={content} />
    </DocsLayout>
  );
} 