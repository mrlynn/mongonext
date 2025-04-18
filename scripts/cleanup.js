#!/usr/bin/env node

/**
 * This script allows you to easily remove demonstration features from the MongoNext template
 * Run with: npm run cleanup
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define the demo features that can be removed
const demoFeatures = {
  events: {
    name: 'Events',
    description: 'Demo event management pages and components',
    paths: [
      'src/app/admin/events',
      'src/components/ui/events', // If this exists
    ]
  },
  teams: {
    name: 'Teams',
    description: 'Demo team management pages and components',
    paths: [
      'src/app/admin/teams',
      'src/components/ui/teams', // If this exists
    ]
  },
  users: {
    name: 'Users Admin',
    description: 'Demo user management admin pages (keeps auth system)',
    paths: [
      'src/app/admin/users',
    ]
  },
  settings: {
    name: 'Settings',
    description: 'Demo settings pages',
    paths: [
      'src/app/admin/settings',
    ]
  },
  adminDashboard: {
    name: 'Admin Dashboard',
    description: 'Demo admin dashboard pages',
    paths: [
      'src/app/admin/dashboard',
    ]
  },
  plop: {
    name: 'Plop Code Generator',
    description: 'Remove Plop.js code generator (replaced with new generator)',
    paths: [
      'plopfile.js',
      'plop-templates',
      'proof-of-concept'
    ]
  },
  all: {
    name: 'All Demo Features',
    description: 'Remove all demonstration features',
    // This will be compiled from all the above
    paths: []
  }
};

// Compile the "all" paths
demoFeatures.all.paths = Object.keys(demoFeatures)
  .filter(key => key !== 'all')
  .flatMap(key => demoFeatures[key].paths);

// Function to safely delete a file or directory
function safeDelete(path) {
  if (fs.existsSync(path)) {
    if (fs.lstatSync(path).isDirectory()) {
      fs.rmSync(path, { recursive: true, force: true });
    } else {
      fs.unlinkSync(path);
    }
    return true;
  }
  return false;
}

// Function to update the sidebar navigation to remove demo links
function updateSidebarNavigation(removedFeatures) {
  const sidebarPath = path.join(process.cwd(), 'src/components/layout/Sidebar.js');
  
  if (!fs.existsSync(sidebarPath)) {
    console.log('Sidebar component not found. Navigation was not updated.');
    return;
  }
  
  try {
    let sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
    
    // Get the names of features to remove
    const featureNames = removedFeatures
      .filter(feature => feature !== 'all')
      .map(feature => demoFeatures[feature].name);
    
    if (featureNames.length === 0) {
      return;
    }
    
    // Find the navigationItems array
    const navigationItemsRegex = /const\s+navigationItems\s*=\s*\[([\s\S]*?)\];/;
    const match = sidebarContent.match(navigationItemsRegex);
    
    if (!match) {
      console.log('Could not find navigationItems array in Sidebar.js');
      return;
    }
    
    // Extract the content of the array
    let arrayContent = match[1];
    
    // Remove the demo features from the array
    featureNames.forEach(featureName => {
      // Create a regex to match the entire object for this feature
      const featureRegex = new RegExp(`{[\\s\\S]*?text:\\s*['"]${featureName}['"][\\s\\S]*?},?`, 'g');
      arrayContent = arrayContent.replace(featureRegex, '');
    });
    
    // Fix any double commas created by the removal
    arrayContent = arrayContent.replace(/,\s*,/g, ',');
    
    // Fix trailing comma before closing bracket
    arrayContent = arrayContent.replace(/,\s*\]/g, ']');
    
    // Replace the original array with the updated one
    const updatedContent = sidebarContent.replace(
      navigationItemsRegex,
      `const navigationItems = [${arrayContent}];`
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(sidebarPath, updatedContent);
    console.log('Updated sidebar navigation to remove demo links.');
  } catch (error) {
    console.error('Error updating sidebar navigation:', error);
  }
}

// Function to update the package.json to add the cleanup script
function addCleanupScriptToPackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log('package.json not found.');
    return;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Add the cleanup script if it doesn't exist
    if (!packageJson.scripts.cleanup) {
      packageJson.scripts.cleanup = 'node scripts/cleanup.js';
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('Added cleanup script to package.json');
    }
  } catch (error) {
    console.error('Error updating package.json:', error);
  }
}

// Main function
async function main() {
  console.log('\n🧹 MongoNext Template Cleanup Tool 🧹\n');
  console.log('This tool helps you remove demonstration features from the template.');
  console.log('Select which features you want to remove:\n');
  
  // Display options
  Object.keys(demoFeatures).forEach((key, index) => {
    console.log(`${index + 1}. ${demoFeatures[key].name} - ${demoFeatures[key].description}`);
  });
  
  // Special message for Plop cleanup
  console.log('\nNote: The Plop code generator has been replaced with a new EJS-based generator.');
  console.log('      If you select option 6, the old Plop files will be removed.');
  
  // Get user selection
  const promptSelection = () => {
    return new Promise((resolve) => {
      rl.question('\nEnter the numbers of features to remove (comma-separated) or "q" to quit: ', (answer) => {
        if (answer.toLowerCase() === 'q') {
          resolve([]);
          return;
        }
        
        const selections = answer
          .split(',')
          .map(s => s.trim())
          .filter(s => s !== '')
          .map(s => parseInt(s, 10) - 1)
          .filter(n => !isNaN(n) && n >= 0 && n < Object.keys(demoFeatures).length)
          .map(n => Object.keys(demoFeatures)[n]);
        
        if (selections.length === 0) {
          console.log('Invalid selection. Please try again.');
          resolve(promptSelection());
        } else {
          resolve(selections);
        }
      });
    });
  };
  
  const selectedFeatures = await promptSelection();
  
  if (selectedFeatures.length === 0) {
    console.log('No features selected. Exiting...');
    rl.close();
    return;
  }
  
  // Confirm deletion
  rl.question(`\nAre you sure you want to remove ${selectedFeatures.map(f => demoFeatures[f].name).join(', ')}? (y/n): `, (answer) => {
    if (answer.toLowerCase() !== 'y') {
      console.log('Operation cancelled.');
      rl.close();
      return;
    }
    
    console.log('\nRemoving selected features...');
    
    // Process "all" selection specially
    if (selectedFeatures.includes('all')) {
      selectedFeatures.length = 0;
      selectedFeatures.push(...Object.keys(demoFeatures).filter(key => key !== 'all'));
    }
    
    // Delete the files/directories
    let deletedCount = 0;
    const failedPaths = [];
    
    selectedFeatures.forEach(feature => {
      demoFeatures[feature].paths.forEach(p => {
        const fullPath = path.join(process.cwd(), p);
        if (safeDelete(fullPath)) {
          console.log(`✓ Removed: ${p}`);
          deletedCount++;
        } else {
          failedPaths.push(p);
        }
      });
    });
    
    // Update the sidebar navigation
    updateSidebarNavigation(selectedFeatures);
    
    console.log(`\nRemoved ${deletedCount} files/directories.`);
    
    if (failedPaths.length > 0) {
      console.log('\nThe following paths were not found:');
      failedPaths.forEach(p => console.log(`- ${p}`));
    }
    
    console.log('\n🎉 Cleanup complete! Your template is now ready for customization.');
    console.log('\nRun this script again any time with: npm run cleanup');
    
    rl.close();
  });
}

// Run the script if it's called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().then(() => process.exit(0));
}

export { demoFeatures, safeDelete, updateSidebarNavigation };