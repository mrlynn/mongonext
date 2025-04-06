# API Documentation

This document provides an overview of the API architecture and available endpoints in the MongoNext template.

## API Architecture

The API is built using Next.js API routes, providing a RESTful interface for client-server communication. All API routes are located in the `src/app/api` directory.

## Authentication

All API routes (except public ones) require authentication using NextAuth.js.

### Headers
```
Authorization: Bearer <token>
```

## API Endpoints

### Authentication

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST /api/auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### User Management

#### GET /api/users/me
Get current user profile.

**Response:**
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user"
}
```

#### PUT /api/users/me
Update user profile.

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

### Data Models

#### GET /api/models
List all models (requires admin role).

**Response:**
```json
{
  "models": [
    {
      "id": "model_id",
      "name": "Model Name",
      "createdAt": "2024-04-06T12:00:00Z"
    }
  ]
}
```

#### POST /api/models
Create a new model (requires admin role).

**Request Body:**
```json
{
  "name": "New Model",
  "description": "Model description"
}
```

## Error Handling

API errors follow a consistent format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

Common error codes:
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid input data
- `INTERNAL_ERROR`: Server error

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

## Development

### Creating New API Routes

1. Use the Plop generator:
```bash
npm run plop api
```

2. Manual creation:
```javascript
// src/app/api/example/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET(request) {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  return NextResponse.json({ data: 'example' });
}
```

### Testing API Routes

```javascript
// tests/api/example.test.js
import { createMocks } from 'node-mock-http';
import { GET } from '@/app/api/example/route';

describe('Example API', () => {
  it('returns 401 when not authenticated', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });
    
    await GET(req);
    
    expect(res._getStatusCode()).toBe(401);
  });
});
```

## Related Documentation

- [Authentication](../architecture/auth.md)
- [Database Schema](../architecture/database.md)
- [Development Workflows](../development/workflows.md) 