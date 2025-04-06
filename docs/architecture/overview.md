# Architecture Overview

MongoNext follows a modern, modular architecture designed for scalability and maintainability. This document outlines the key architectural components and their interactions.

## Directory Structure

```
mongonext/
├── src/
│   ├── app/                 # Next.js App Router pages and API routes
│   ├── components/          # Reusable React components
│   │   ├── ui/             # Basic UI components
│   │   ├── forms/          # Form-related components
│   │   ├── layout/         # Layout components
│   │   └── dashboard/      # Dashboard-specific components
│   ├── lib/                # Core utilities and services
│   │   ├── api/           # API utility functions
│   │   ├── auth/          # Authentication logic
│   │   ├── db/            # Database connection and models
│   │   └── utils/         # Helper functions
│   └── styles/            # Global styles and theme
├── public/                # Static assets
└── docs/                 # Documentation
```

## Key Architectural Components

### 1. Frontend Layer (Next.js App Router)

- **Pages**: Located in `src/app/`
- **Components**: Organized by feature/function in `src/components/`
- **Styling**: Material UI with Emotion for custom styling
- **State Management**: React Context + Hooks
- **Routing**: Next.js App Router with dynamic routes

### 2. Backend Layer (Next.js API Routes)

- **API Routes**: Located in `src/app/api/`
- **Authentication**: NextAuth.js integration
- **Database Access**: Mongoose models and utilities
- **Middleware**: Request/response processing

### 3. Data Layer (MongoDB + Mongoose)

- **Models**: Mongoose schemas with validation
- **Connections**: Managed connection pool
- **Indexing**: Optimized for common queries
- **Virtuals**: Computed properties

### 4. Authentication Layer

- **Providers**: Google OAuth, Email/Password
- **Session Management**: JWT-based
- **Role-Based Access**: User roles and permissions
- **Security**: CSRF protection, rate limiting

## Development Workflow

1. **Component Development**
   - Create components in `src/components/`
   - Add Storybook stories
   - Write tests using Vitest

2. **API Development**
   - Define Mongoose models
   - Create API routes
   - Add validation and error handling

3. **Feature Implementation**
   - Use Plop.js generators
   - Follow established patterns
   - Document changes

## Best Practices

- **Code Organization**: Feature-based structure
- **Testing**: Unit tests for components, integration tests for API
- **Documentation**: JSDoc comments, Storybook stories
- **Error Handling**: Consistent error patterns
- **Performance**: Optimized MongoDB queries, proper indexing

## Related Documentation

- [Development Workflows](../development/workflows.md)
- [API Documentation](../api/overview.md)
- [Database Schema](../architecture/database.md)
- [Authentication](../architecture/auth.md) 