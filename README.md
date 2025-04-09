# MongoNext - Next.js MongoDB Starter Template

A modern, full-featured starter template for building web applications with Next.js, MongoDB, and Material UI.

## Features

- **Next.js 15** - The latest version of Next.js with App Router
- **MongoDB & Mongoose** - Database integration with Mongoose ODM
- **Material UI** - Beautiful, responsive UI components
- **Authentication** - Built-in authentication with NextAuth.js
- **Code Generation** - Powerful code generator for creating features
- **Storybook** - Component documentation and testing
- **TypeScript Support** - Optional TypeScript support

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mrlynn/mongonext.git
   cd mongonext
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your MongoDB connection string and other settings.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Code Generation

The template includes a powerful code generator that helps you quickly create new features:

```bash
npm run generate feature
```

This will prompt you for:
- Feature name (singular form)
- Feature description
- Whether to include list view
- Whether to include create form
- Whether to include edit form
- Whether to include delete functionality
- Whether to add to sidebar navigation
- Material-UI icon for navigation

The generator will create:
- MongoDB model
- API routes (collection and individual items)
- Pages (list, create, edit)
- Components (list, form, detail)
- Update sidebar navigation

For more information, see the [Code Generation Documentation](/docs/development/code-generation.md).

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- [Getting Started](/docs/getting-started)
- [Architecture](/docs/architecture)
- [API](/docs/api)
- [Development](/docs/development)
- [Deployment](/docs/deployment)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 