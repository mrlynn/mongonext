# Development Workflows

This guide outlines the standard development workflows and best practices for working with the MongoNext template.

## Development Environment Setup

1. **IDE Setup**
   - Recommended: VS Code with extensions:
     - ESLint
     - Prettier
     - MongoDB for VS Code
     - GitLens

2. **Environment Configuration**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Edit .env.local with your settings
   ```

## Component Development

### Creating New Components

1. **Using Plop Generator**
   ```bash
   npm run plop component
   ```
   Follow the prompts to generate:
   - Component file
   - Story file
   - Test file
   - Index file

2. **Manual Component Creation**
   ```jsx
   // src/components/ui/MyComponent.js
   'use client';
   
   import { Box } from '@mui/material';
   
   /**
    * @param {Object} props
    * @param {string} props.title - Component title
    */
   export function MyComponent({ title }) {
     return (
       <Box sx={{ p: 2 }}>
         {title}
       </Box>
     );
   }
   ```

### Component Testing

1. **Unit Tests**
   ```bash
   # Run all tests
   npm test
   
   # Run specific test
   npm test MyComponent
   ```

2. **Storybook Development**
   ```bash
   npm run storybook
   ```

## API Development

### Creating API Routes

1. **Using Plop Generator**
   ```bash
   npm run plop api
   ```

2. **Manual Route Creation**
   ```javascript
   // src/app/api/example/route.js
   import { NextResponse } from 'next/server';
   
   export async function GET() {
     return NextResponse.json({ message: 'Hello' });
   }
   ```

### Database Models

1. **Creating Models**
   ```javascript
   // src/lib/db/models/Example.js
   import mongoose from 'mongoose';
   
   const exampleSchema = new mongoose.Schema({
     name: { type: String, required: true },
     createdAt: { type: Date, default: Date.now }
   });
   
   export const Example = mongoose.models.Example || 
     mongoose.model('Example', exampleSchema);
   ```

## Git Workflow

1. **Branch Naming**
   - Feature: `feature/component-name`
   - Bugfix: `fix/issue-description`
   - Documentation: `docs/topic`

2. **Commit Messages**
   ```
   feat: add new component
   fix: resolve authentication issue
   docs: update API documentation
   ```

3. **Pull Requests**
   - Create PR with description
   - Link related issues
   - Request reviews
   - Pass CI checks

## Code Quality

1. **Linting**
   ```bash
   npm run lint
   ```

2. **Formatting**
   ```bash
   # Format all files
   npm run format
   
   # Format specific file
   npm run format src/components/MyComponent.js
   ```

## Deployment

1. **Development**
   ```bash
   npm run dev
   ```

2. **Production Build**
   ```bash
   npm run build
   npm run start
   ```

## Troubleshooting

Common issues and solutions:

1. **MongoDB Connection**
   - Check connection string in `.env.local`
   - Verify MongoDB is running
   - Check network connectivity

2. **Authentication Issues**
   - Verify NextAuth configuration
   - Check provider settings
   - Clear browser cookies

3. **Build Errors**
   - Clear `.next` directory
   - Reinstall dependencies
   - Check for conflicting versions

## Related Documentation

- [Quick Start Guide](../getting-started/quickstart.md)
- [Architecture Overview](../architecture/overview.md)
- [API Documentation](../api/overview.md) 