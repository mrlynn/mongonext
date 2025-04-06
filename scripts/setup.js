#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Setting up your MongoNext application...');

// Ask for configuration values
rl.question('🔧 MongoDB URI (leave blank for development): ', (mongoUri) => {
  rl.question('📧 Will you be using email verification? (y/n): ', (useEmail) => {
    // Generate a random secret for NextAuth
    const randomSecret = require('crypto').randomBytes(32).toString('hex');
    
    // Create .env.local file
    const envContent = `MONGODB_URI=${mongoUri || 'mongodb://localhost:27017/mongonext-dev'}
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=${randomSecret}

# Email Configuration (for verification and password reset)
${useEmail.toLowerCase() === 'y' ? `EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=user@example.com
EMAIL_SERVER_PASSWORD=password
EMAIL_FROM=noreply@example.com` : '# Email configuration not enabled'}
`;

    fs.writeFileSync('.env.local', envContent);
    console.log('✅ Environment variables configured!');
    
    // Install dependencies
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log(`
🎉 Setup complete! Your MongoNext application is ready.

💻 Next steps:
  1. Edit .env.local to configure email settings (if needed)
  2. Start your development server: npm run dev
  3. Open http://localhost:3000 in your browser
  
Happy coding! 🚀
    `);
    
    rl.close();
  });
});