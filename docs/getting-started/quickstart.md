# Quick Start Guide

## Prerequisites

- Node.js 18.0 or higher
- MongoDB 6.0 or higher
- npm or yarn package manager

## Installation

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
Edit `.env.local` with your configuration:
- `MONGODB_URI`: Your MongoDB connection string
- `NEXTAUTH_SECRET`: A random string for session encryption
- `NEXTAUTH_URL`: Your application URL (http://localhost:3000 for development)
- Email configuration (for password reset functionality)

4. Run the setup script:
```bash
npm run setup
```

5. Start the development server:
```bash
npm run dev
```

Your application will be running at http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run storybook` - Start Storybook
- `npm run plop` - Generate new components/pages

## Next Steps

- Check out the [Architecture Guide](../architecture/overview.md)
- Learn about [Development Workflows](../development/workflows.md)
- Explore [API Documentation](../api/overview.md)
- Review [Deployment Guide](../deployment/guide.md) 