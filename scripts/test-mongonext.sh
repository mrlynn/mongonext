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

print_success "Environment file created with AUTH_REQUIRED=$AUTH_REQUIRED"

print_step "Running setup script"
npm run setup || { print_warning "Setup script failed, but continuing"; }

print_step "Testing cleanup script"
# List the available options first
echo "Available cleanup options:"
node scripts/cleanup.js --list || { print_warning "Cleanup script failed to list options"; }

print_step "Testing Plop generator"
# List the available generators first
echo "Available Plop generators:"
npm run plop -- --list || { print_warning "Plop generator failed to list options"; }

print_step "Ready for testing!"
echo -e "Your test MongoNext project is set up in: ${BOLD}$(pwd)${NC}"
echo -e "To start the development server: ${BOLD}npm run dev${NC}"
echo -e "To run the cleanup script: ${BOLD}npm run cleanup${NC}"
echo -e "To run the Plop generator: ${BOLD}npm run plop${NC}"

# Optional: Add test scenarios for automatic testing
if [ "$1" == "--auto-test" ]; then
  print_step "Running automated tests"

  # Test cleanup script with specific option
  echo "Testing cleanup: removing demo events feature"
  npm run cleanup -- events || { print_error "Cleanup script failed"; }

  # Test plop generator with feature creation
  echo "Testing plop: creating a product feature"
  npx plop feature product "A test product feature" --yes || { print_error "Plop feature generator failed"; }

  # Build the project to ensure no errors
  npm run build || { print_error "Build failed"; exit 1; }

  print_success "Automated tests completed successfully"
fi

echo -e "\n${BOLD}${GREEN}Test harness setup complete!${NC}\n"