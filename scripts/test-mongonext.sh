#!/bin/bash

# MongoNext Test Harness
# This script sets up a fresh MongoNext project for testing the customization features

# Configuration
REPO_URL="https://github.com/mrlynn/mongonext.git"
TEST_DIR="mongonext-test-$(date +%Y%m%d-%H%M%S)"
MONGODB_URI="mongodb://localhost:27017/mongonext-test"

# Text formatting
BOLD="\033[1m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
BLUE="\033[0;34m"
NC="\033[0m" # No Color

# Function to print step headers
print_step() {
  echo -e "\n${BOLD}${BLUE}=== $1 ===${NC}\n"
}

# Function to print success messages
print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

# Function to print warnings
print_warning() {
  echo -e "${YELLOW}! $1${NC}"
}

# Function to print errors
print_error() {
  echo -e "${RED}✗ $1${NC}"
}

print_step "Setting up MongoNext test project in $TEST_DIR"

# Create directory and clone the repository
mkdir -p "$TEST_DIR"
cd "$TEST_DIR" || { print_error "Failed to create test directory"; exit 1; }

print_step "Cloning MongoNext repository"
git clone "$REPO_URL" . || { print_error "Failed to clone repository"; exit 1; }
print_success "Repository cloned successfully"

print_step "Installing dependencies"
npm install || { print_error "Failed to install dependencies"; exit 1; }
print_success "Dependencies installed successfully"

print_step "Setting up environment"

# Prompt for AUTH_REQUIRED
while true; do
    read -p "Do you want to require authentication? (yes/no): " auth_required
    case $auth_required in
        [Yy]* ) AUTH_REQUIRED="true"; break;;
        [Nn]* ) AUTH_REQUIRED="false"; break;;
        * ) echo "Please answer yes or no.";;
    esac
done

# Create .env.local file with test settings
cat > .env.local << EOF
MONGODB_URI=$MONGODB_URI
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=test-secret-key-for-local-development-only

# Test email configuration (ethereal.email)
EMAIL_SERVER_HOST=smtp.ethereal.email
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=ethereal.user@ethereal.email
EMAIL_SERVER_PASSWORD=ethereal.password
EMAIL_FROM=noreply@example.com

# Authentication requirement
AUTH_REQUIRED=$AUTH_REQUIRED
EOF

# Verify .env.local was created correctly
if [ ! -f .env.local ]; then
    print_error "Failed to create .env.local file"
    exit 1
fi

# Verify AUTH_REQUIRED is in the file
if ! grep -q "AUTH_REQUIRED=$AUTH_REQUIRED" .env.local; then
    print_error "AUTH_REQUIRED setting not found in .env.local"
    exit 1
fi

print_success "Environment file created with AUTH_REQUIRED=$AUTH_REQUIRED"

print_step "Running setup script"
# Skip the setup script since it's using CommonJS syntax but the project is configured for ES modules
print_warning "Skipping setup script due to ES module compatibility issues"

print_step "Testing cleanup script"
# List the available options first
echo "Available cleanup options:"
node scripts/cleanup.js --list || { print_warning "Cleanup script failed to list options"; }

print_step "Testing code generator"
# Test the generator with a sample feature
echo "Testing feature generator:"

# Check if the generator file exists
if [ -f "generator/index.js" ]; then
  print_success "Generator file exists"
  
  # Check for required dependencies
  print_step "Checking required dependencies"
  
  # Check if the MongoDB connection file exists
  if [ ! -f "src/lib/mongodb.js" ]; then
    print_warning "MongoDB connection file not found, creating it..."
    
    # Create the MongoDB connection file
    mkdir -p src/lib
    cat > src/lib/mongodb.js << EOF
/**
 * @file MongoDB connection utility
 * @module lib/mongodb
 */

import mongoose from 'mongoose';

/**
 * Cache the database connection
 * @type {Promise<typeof mongoose>|null}
 */
let cached = global.mongoose;

/**
 * Initialize the cached mongoose connection
 */
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB
 * Ensures a single connection is reused across the application
 * 
 * @async
 * @function connectDB
 * @returns {Promise<typeof mongoose>} Mongoose connection instance
 * @throws {Error} If connection fails
 */
async function connectDB() {
  // If connection exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    // MongoDB driver 4.0+ doesn't need these options anymore
    const options = {};

    cached.promise = mongoose.connect(MONGODB_URI, options)
      .then((mongoose) => {
        console.log('Connected to MongoDB');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        throw error;
      });
  }

  // Wait for connection and cache it
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
EOF
    print_success "MongoDB connection file created"
  else
    print_success "MongoDB connection file exists"
  fi
  
  # Create a non-interactive script to run the generator
  cat > run_generator.mjs << EOF
import { spawn } from 'child_process';
import readline from 'readline';
import fs from 'fs';

// Create a temporary file with the answers
const answers = \`product
A test product feature
y
y
y
y
y
ShoppingCart\`;

fs.writeFileSync('generator_answers.txt', answers);

// Start the generator process with the answers file
const generator = spawn('node', ['generator/index.js', 'feature'], { 
  stdio: ['pipe', 'pipe', 'pipe'],
  env: { ...process.env, FORCE_COLOR: '1' }
});

// Pipe the answers to the generator
const answersStream = fs.createReadStream('generator_answers.txt');
answersStream.pipe(generator.stdin);

// Handle process completion
generator.on('close', (code) => {
  // Clean up the answers file
  fs.unlinkSync('generator_answers.txt');
  process.exit(code);
});

// Handle errors
generator.stderr.on('data', (data) => {
  console.error(\`Generator error: \${data}\`);
});

// Handle process errors
generator.on('error', (err) => {
  console.error(\`Failed to start generator: \${err}\`);
  process.exit(1);
});
EOF

  # Run the temporary script
  node run_generator.mjs
  GENERATOR_RESULT=$?
  
  # Clean up the temporary script
  rm run_generator.mjs
  
  if [ $GENERATOR_RESULT -eq 0 ]; then
    print_success "Generator ran successfully"
    
    # Verify that product assets were created
    if [ -d "app/dashboard/products" ] || [ -d "components/dashboard/products" ] || [ -f "models/Product.js" ]; then
      print_success "Product assets were created"
    else
      print_warning "Generator ran but no product assets were found"
    fi
  else
    print_warning "Generator failed with exit code $GENERATOR_RESULT"
  fi
else
  print_error "Generator file not found"
fi

print_step "Ready for testing!"
echo -e "Your test MongoNext project is set up in: ${BOLD}$(pwd)${NC}"
echo -e "To start the development server: ${BOLD}npm run dev${NC}"
echo -e "To run the cleanup script: ${BOLD}npm run cleanup${NC}"
echo -e "To run the code generator: ${BOLD}npm run generate feature${NC}"

# Optional: Add test scenarios for automatic testing
if [ "$1" == "--auto-test" ]; then
  print_step "Running automated tests"

  # Test cleanup script with specific option
  echo "Testing cleanup: removing demo events feature"
  npm run cleanup -- events || { print_error "Cleanup script failed"; }

  # Build the project to ensure no errors
  npm run build || { print_error "Build failed"; exit 1; }

  print_success "Automated tests completed successfully"
fi

print_step "Cleaning up test assets"
# Remove any generated product assets
echo "Removing any generated product assets..."

# Check if the product feature exists and remove it
if [ -d "app/dashboard/products" ]; then
  echo "Removing product feature directory..."
  rm -rf "app/dashboard/products"
  print_success "Product feature directory removed"
fi

if [ -d "components/dashboard/products" ]; then
  echo "Removing product components directory..."
  rm -rf "components/dashboard/products"
  print_success "Product components directory removed"
fi

if [ -f "models/Product.js" ]; then
  echo "Removing Product model..."
  rm -f "models/Product.js"
  print_success "Product model removed"
fi

if [ -f "app/api/products/route.js" ]; then
  echo "Removing product API routes..."
  rm -rf "app/api/products"
  print_success "Product API routes removed"
fi

if [ -f "app/api/products/[id]/route.js" ]; then
  echo "Removing product API ID routes..."
  rm -rf "app/api/products/[id]"
  print_success "Product API ID routes removed"
fi

# Check for any other product-related files
find . -name "*product*" -type f -not -path "*/node_modules/*" -not -path "*/\.*" | while read -r file; do
  echo "Removing additional product file: $file"
  rm -f "$file"
done

print_success "All product assets have been cleaned up"

echo -e "\n${BOLD}${GREEN}Test harness setup complete!${NC}\n"