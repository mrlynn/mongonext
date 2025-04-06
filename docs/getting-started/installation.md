# Installation Guide

This guide will walk you through setting up the MongoNext starter template using the Next.js create-next-app feature and deploying it to Vercel or Netlify.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher) or yarn
- Git (recommended but not required)
- MongoDB Atlas account (for cloud database)

## Quick Installation

### Using create-next-app (Recommended)

The fastest way to get started is by using Next.js's create-next-app feature with our template:

```bash
npx create-next-app@latest my-project --example https://github.com/mrlynn/mongonext
# or
yarn create next-app my-project --example https://github.com/mrlynn/mongonext
# or
pnpm create next-app my-project --example https://github.com/mrlynn/mongonext
```

### Alternative: Clone Repository

If you prefer to clone directly:

```bash
git clone https://github.com/mrlynn/mongonext.git my-project
cd my-project
npm install
```

## Environment Setup

1. Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

2. Configure the following environment variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mongonext

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key

# Optional OAuth Providers
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# Optional Email Configuration
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=user@example.com
EMAIL_SERVER_PASSWORD=your-password
EMAIL_FROM=noreply@example.com
```

> **Quick Secret Generation**: You can generate a random NEXTAUTH_SECRET using this command:
> ```bash
> openssl rand -base64 32
> ```

## Database Setup

### MongoDB Atlas (Recommended)

1. [Create a free MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (the free tier is sufficient for development)
3. Create a database user with read/write permissions
4. Add your IP address to the IP Access List (or use 0.0.0.0/0 for development)
5. Get your connection string from the "Connect" button
6. Replace `<username>`, `<password>`, and update the database name in your `.env.local` file

### Local MongoDB (Alternative)

If you prefer a local MongoDB installation:

```env
MONGODB_URI=mongodb://localhost:27017/mongonext
```

## Running the Application

Start the development server:

```bash
npm run dev
```

Your application will be available at [http://localhost:3000](http://localhost:3000)

## Deployment Options

### Deploying to Vercel (Recommended)

Vercel is the platform built by the creators of Next.js and offers the simplest deployment experience.

1. **Push your project to a GitHub, GitLab, or Bitbucket repository**

2. **Connect Vercel to your repository**
   
   - Create a [Vercel account](https://vercel.com/signup) if you don't have one
   - Click "Import Project" in your Vercel dashboard
   - Select "Import Git Repository" and authorize Vercel to access your repository
   - Select your MongoNext project repository

3. **Configure environment variables**
   
   - Add all the variables from your `.env.local` file to Vercel's environment variables section
   - Make sure to update `NEXTAUTH_URL` to match your production URL

4. **Deploy**
   
   - Click "Deploy" and Vercel will automatically build and deploy your application
   - Your site will be live at a URL like `https://your-project.vercel.app`

### Deploying to Netlify

Netlify is another excellent option for Next.js projects.

1. **Push your project to a GitHub, GitLab, or Bitbucket repository**

2. **Connect Netlify to your repository**
   
   - Create a [Netlify account](https://app.netlify.com/signup) if you don't have one
   - Click "New site from Git" in your Netlify dashboard
   - Select your Git provider and authorize Netlify to access your repository
   - Select your MongoNext project repository

3. **Configure build settings**
   
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Configure environment variables**
   
   - Add all the variables from your `.env.local` file to Netlify's environment variables section
   - Make sure to update `NEXTAUTH_URL` to match your production URL

5. **Deploy**
   
   - Click "Deploy site" and Netlify will build and deploy your application
   - Your site will be live at a URL like `https://your-project.netlify.app`

6. **Configure Netlify for Next.js**
   
   - After your first deploy, go to Site settings > Build & deploy > Continuous Deployment
   - Add a `netlify.toml` file to your repository:
   
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

## Verifying Installation

After deployment, verify your application is working properly:

1. Visit your deployed URL
2. Test site navigation
3. Create a new account using the sign-up form
4. Test the authentication flow (login, logout)
5. Verify that database operations work properly

## Next Steps

Now that your MongoNext application is deployed, you might want to:

1. [Configure additional authentication providers](/docs/architecture/auth)
2. [Create custom API routes](/docs/api/overview)
3. [Set up your database schema](/docs/architecture/database)
4. [Implement CI/CD workflows](/docs/development/workflows)
5. [Add a custom domain to your deployment](/docs/deployment/configuration)

## Troubleshooting

### Database Connection Issues

If you can't connect to MongoDB:

- Verify your MongoDB connection string
- Ensure you've allowlisted your application's IP address in MongoDB Atlas
- Check if your database user has the correct permissions

### Deployment Issues

- **Vercel**: Check build logs in your Vercel dashboard under the "Deployments" tab
- **Netlify**: Check build logs in your Netlify dashboard under the "Deploys" tab
- Ensure all environment variables are correctly set in your deployment platform

### NextAuth Configuration Issues

- Ensure `NEXTAUTH_URL` matches your deployment URL
- Make sure `NEXTAUTH_SECRET` is set
- Verify any OAuth provider credentials are correct

## Getting Help

- [Submit an issue on GitHub](https://github.com/mrlynn/mongonext/issues)
- [Join our community on Discord](https://discord.gg/mongonext)
- Check the [Troubleshooting Guide](/docs/development/troubleshooting) for more detailed solutions