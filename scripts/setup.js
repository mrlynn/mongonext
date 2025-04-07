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
    
    // Read existing .env.local file if it exists
    let existingEnvContent = '';
    try {
      if (fs.existsSync('.env.local')) {
        existingEnvContent = fs.readFileSync('.env.local', 'utf8');
        console.log('📝 Found existing .env.local file. Preserving existing configurations.');
      }
    } catch (error) {
      console.error('Error reading existing .env.local file:', error);
    }
    
    // Parse existing environment variables
    const existingEnvVars = {};
    existingEnvContent.split('\n').forEach(line => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        existingEnvVars[key] = value;
      }
    });
    
    // Create new environment variables
    const newEnvVars = {
      'MONGODB_URI': mongoUri || 'mongodb://localhost:27017/mongonext-dev',
      'NEXTAUTH_URL': 'http://localhost:3000',
      'NEXTAUTH_SECRET': randomSecret
    };
    
    // Add email configuration if needed
    if (useEmail.toLowerCase() === 'y') {
      newEnvVars['EMAIL_SERVER_HOST'] = 'smtp.example.com';
      newEnvVars['EMAIL_SERVER_PORT'] = '587';
      newEnvVars['EMAIL_SERVER_USER'] = 'user@example.com';
      newEnvVars['EMAIL_SERVER_PASSWORD'] = 'password';
      newEnvVars['EMAIL_FROM'] = 'noreply@example.com';
    }
    
    // Merge existing and new environment variables
    const mergedEnvVars = { ...existingEnvVars, ...newEnvVars };
    
    // Convert to .env format
    let envContent = '';
    Object.entries(mergedEnvVars).forEach(([key, value]) => {
      envContent += `${key}=${value}\n`;
    });
    
    // Add email configuration comment if not using email
    if (useEmail.toLowerCase() !== 'y') {
      envContent += '\n# Email configuration not enabled\n';
    }
    
    // Write to .env.local file
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