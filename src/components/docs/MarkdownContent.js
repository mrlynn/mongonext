'use client';

import { Box } from '@mui/material';

export default function MarkdownContent({ content }) {
  return (
    <Box 
      className="markdown-content"
      sx={(theme) => ({ 
        color: 'text.primary',
        '& h1': { 
          mb: 3, 
          mt: 4,
          color: 'text.primary'
        },
        '& h2': { 
          mb: 2, 
          mt: 3,
          color: 'text.primary'
        },
        '& h3': { 
          mb: 2, 
          mt: 2,
          color: 'text.primary'
        },
        '& p': { 
          mb: 2,
          color: 'text.primary'
        },
        '& ul, & ol': { 
          mb: 2, 
          pl: 2,
          color: 'text.primary'
        },
        '& li': { 
          mb: 1,
          color: 'text.primary'
        },
        '& code': { 
          bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
          color: theme.palette.mode === 'dark' ? 'grey.100' : 'grey.900',
          p: 0.5, 
          borderRadius: 1,
          fontFamily: 'monospace'
        },
        '& pre': { 
          bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
          color: theme.palette.mode === 'dark' ? 'grey.100' : 'grey.900',
          p: 2, 
          borderRadius: 1,
          overflow: 'auto',
          mb: 2
        },
        '& a': { 
          color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.main',
          '&:hover': {
            color: theme.palette.mode === 'dark' ? 'primary.main' : 'primary.dark',
          }
        },
        '& table': { 
          borderCollapse: 'collapse',
          width: '100%',
          mb: 2
        },
        '& th, & td': { 
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
          p: 1
        },
        '& th': { 
          bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
          color: 'text.primary'
        },
        '& blockquote': {
          borderLeft: '4px solid',
          borderColor: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.main',
          pl: 2,
          py: 1,
          my: 2,
          bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
          color: 'text.primary'
        }
      })}
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
} 