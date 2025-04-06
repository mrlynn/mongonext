# MongoNext

<p align="center">
  <img src="public/logo.svg" alt="MongoNext Logo" width="120" />
</p>

<p align="center">
  A professional, production-ready starter template for building modern web applications with Next.js and MongoDB
</p>

<p align="center">
  <a href="https://github.com/yourusername/mongonext/stargazers"><img src="https://img.shields.io/github/stars/yourusername/mongonext" alt="Stars"></a>
  <a href="https://github.com/yourusername/mongonext/blob/main/LICENSE"><img src="https://img.shields.io/github/license/yourusername/mongonext" alt="License"></a>
  <a href="https://github.com/yourusername/mongonext/releases"><img src="https://img.shields.io/github/v/release/yourusername/mongonext" alt="Release"></a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
</p>

## ✨ Features

MongoNext combines the power of Next.js, MongoDB, React, and Material UI to provide a robust foundation for your projects:

- 🚀 **App Router Ready**: Built on Next.js with full App Router support
- 🎨 **Material UI**: Pre-configured theming and components
- 🌗 **Dark/Light Mode**: Fully integrated theme switcher
- 🔐 **Authentication**: Ready-to-use authentication flows with NextAuth.js
- 📱 **Responsive**: Mobile-first design principles throughout
- 📊 **Dashboard Layout**: Professional admin layout with sidebar navigation
- 🧩 **Component Library**: Extensive collection of pre-built UI components
- 🔧 **Developer Experience**: Configured with ESLint, Prettier, and Husky

## 📸 Screenshots

<table>
  <tr>
    <td>
      <img src="public/screenshots/dashboard-light.png" alt="Dashboard Light Mode" />
      <p align="center">Dashboard (Light)</p>
    </td>
    <td>
      <img src="public/screenshots/dashboard-dark.png" alt="Dashboard Dark Mode" />
      <p align="center">Dashboard (Dark)</p>
    </td>
  </tr>
  <tr>
    <td>
      <img src="public/screenshots/auth-light.png" alt="Authentication Light Mode" />
      <p align="center">Authentication (Light)</p>
    </td>
    <td>
      <img src="public/screenshots/auth-dark.png" alt="Authentication Dark Mode" />
      <p align="center">Authentication (Dark)</p>
    </td>
  </tr>
</table>

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

```bash
# Create a new project
npx create-next-app my-app -e https://github.com/yourusername/mongonext

# Navigate to your new project
cd my-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your environment values

# Start the development server
npm run dev
```

Visit http://localhost:3000 to see your application.

## 🏗️ Project Structure

```
mongonext/
├── app/                      # Next.js App Router pages
│   ├── api/                  # API routes
│   ├── (auth)/               # Authentication pages
│   ├── dashboard/            # Dashboard pages
│   └── ...
├── components/               # Reusable components
│   ├── auth/                 # Authentication components
│   ├── dashboard/            # Dashboard components
│   ├── forms/                # Form components
│   ├── layout/               # Layout components
│   └── ui/                   # UI components
├── contexts/                 # React Context providers
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions and libraries
│   ├── auth/                 # Auth utilities
│   ├── api/                  # API utilities
│   └── db/                   # Database utilities
├── models/                   # Data models
├── public/                   # Static assets
└── styles/                   # Global styles
```

## 🎨 Customization

### Theme Configuration

The template comes with a fully customizable theme system. Edit the theme settings in `app/providers.js`:

```javascript
// Example of customizing the color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Change to your brand color
    },
    secondary: {
      main: '#dc004e', // Change to your secondary color
    },
  },
});
```

### Adding Pages

Create new pages in the app directory following the Next.js App Router conventions:

```javascript
// app/about/page.js
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page.</p>
    </div>
  );
}
```

### Components

The template includes a comprehensive set of components. You can easily customize or extend them:

```javascript
// Example of customizing a component
import Button from '@/components/ui/Button';

// Use with custom props
<Button size="large" variant="outlined">
  Custom Button
</Button>
```

## 🔧 Advanced Configuration

### Authentication and User Management

MongoNext includes a full-featured user management system built on NextAuth.js with the following features:

- **Email/Password Authentication**: Traditional login method with secure password hashing
- **Social Login**: Optional integration with Google, GitHub, etc.
- **Email Verification**: Verify new accounts via email
- **Password Reset**: Secure password recovery workflow
- **User Profiles**: User profile management with customizable fields
- **Role-Based Access Control**: User roles (user, admin, moderator)
- **Protected Routes**: Route protection middleware with role checks
- **Session Management**: Persistent sessions with JWT

Configure your providers in `src/lib/auth/config.js`:

```javascript
// Add or modify authentication providers
export const authOptions = {
  providers: [
    CredentialsProvider({
      // Email/password login configuration
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add more providers here
  ],
  // ...
};
```

#### User Management API Endpoints

The template includes ready-to-use API routes for user management:

- **POST /api/auth/register**: Register a new user
- **POST/GET /api/auth/[...nextauth]**: NextAuth.js authentication endpoints
- **GET /api/auth/verify-email**: Verify user email with token
- **POST /api/auth/forgot-password**: Request password reset
- **POST /api/auth/reset-password**: Reset password with token
- **GET/PATCH /api/users/profile**: Get or update current user profile
- **POST /api/users/change-password**: Change user password

#### Client-Side Authentication

Use the included hooks and components to integrate authentication in your pages:

```javascript
// Client-side authentication with session context
import { useSessionContext } from '@/contexts/SessionContext';

function MyComponent() {
  const { user, isAuthenticated, isAdmin } = useSessionContext();
  
  if (!isAuthenticated) {
    return <p>Please log in</p>;
  }
  
  return <p>Welcome, {user.name}!</p>;
}
```

### Database Connection

Configure your MongoDB connection in `.env.local`:

```
MONGODB_URI=your_mongodb_connection_string
```

### API Routes

Create API routes in the `app/api` directory:

```javascript
// app/api/example/route.js
export async function GET(request) {
  // Your API logic here
  return Response.json({ message: 'Hello World' });
}
```

## 📚 Documentation

For more detailed documentation, visit our [official documentation site](https://github.com/yourusername/mongonext/wiki).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Read our [contributing guidelines](CONTRIBUTING.md) for more information.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [Material UI](https://mui.com/) - UI Component Library
- [MongoDB](https://www.mongodb.com/) - Database
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [React Hook Form](https://react-hook-form.com/) - Form Validation

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/yourusername">Your Name</a>
</p>