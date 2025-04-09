#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import { program } from 'commander';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper functions
const helpers = {
  // Convert to PascalCase
  pascalCase: (txt) => {
    return txt
      .split(/[-_\s]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  },
  
  // Convert to camelCase
  camelCase: (txt) => {
    return txt
      .split(/[-_\s]+/)
      .map((word, index) => {
        if (index === 0) {
          return word.charAt(0).toLowerCase() + word.slice(1).toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join('');
  },
  
  // Proper case (first letter uppercase, rest lowercase)
  proper: (txt) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
  },
  
  // Pluralize
  pluralize: (txt) => {
    return txt.endsWith('s') ? txt : `${txt}s`;
  },
  
  // Singularize
  singularize: (txt) => {
    return txt.endsWith('s') ? txt.slice(0, -1) : txt;
  }
};

// Template rendering function
function renderTemplate(templatePath, data) {
  const template = fs.readFileSync(templatePath, 'utf8');
  return ejs.render(template, { ...data, ...helpers });
}

// File writing function
function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Created: ${filePath}`);
}

// Feature generator
async function generateFeature() {
  // Prompt for feature details
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Feature name (singular, e.g., "product"):',
      validate: (input) => {
        if (!input) return 'Feature name is required';
        if (input.includes(' ')) return 'Feature name cannot contain spaces';
        if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(input)) return 'Feature name must start with a letter and contain only alphanumeric characters';
        return true;
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Feature description:',
      default: 'A new feature'
    },
    {
      type: 'confirm',
      name: 'includeList',
      message: 'Include list view?',
      default: true
    },
    {
      type: 'confirm',
      name: 'includeCreate',
      message: 'Include create form?',
      default: true
    },
    {
      type: 'confirm',
      name: 'includeEdit',
      message: 'Include edit form?',
      default: true
    },
    {
      type: 'confirm',
      name: 'includeDelete',
      message: 'Include delete functionality?',
      default: true
    },
    {
      type: 'confirm',
      name: 'addNavigation',
      message: 'Add to sidebar navigation?',
      default: true
    },
    {
      type: 'input',
      name: 'icon',
      message: 'MUI Icon for navigation (e.g., "ShoppingCart"):',
      default: 'Folder'
    }
  ]);
  
  // Process feature name
  const featureName = helpers.singularize(answers.name);
  const featureNamePlural = helpers.pluralize(featureName);
  const PascalFeatureName = helpers.pascalCase(featureName);
  const PascalFeatureNamePlural = helpers.pascalCase(featureNamePlural);
  
  // Prepare data for templates
  const data = {
    ...answers,
    featureName,
    featureNamePlural,
    PascalFeatureName,
    PascalFeatureNamePlural,
    properFeatureName: helpers.proper(featureName),
    properFeatureNamePlural: helpers.proper(featureNamePlural)
  };
  
  // Get templates directory
  const templatesDir = path.join(__dirname, 'templates');
  
  // Generate model
  const modelTemplatePath = path.join(templatesDir, 'model.js.ejs');
  const modelContent = renderTemplate(modelTemplatePath, data);
  const modelFilePath = path.join(process.cwd(), 'src', 'models', `${featureName}.model.js`);
  writeFile(modelFilePath, modelContent);
  
  // Generate API route for collection
  const apiRouteTemplatePath = path.join(templatesDir, 'api-route.js.ejs');
  const apiRouteContent = renderTemplate(apiRouteTemplatePath, data);
  const apiRouteFilePath = path.join(process.cwd(), 'src', 'app', 'api', featureNamePlural, 'route.js');
  writeFile(apiRouteFilePath, apiRouteContent);
  
  // Generate API route for individual items
  const apiRouteIdTemplatePath = path.join(templatesDir, 'api-route-id.js.ejs');
  const apiRouteIdContent = renderTemplate(apiRouteIdTemplatePath, data);
  const apiRouteIdDirPath = path.join(process.cwd(), 'src', 'app', 'api', featureNamePlural, '[id]');
  if (!fs.existsSync(apiRouteIdDirPath)) {
    fs.mkdirSync(apiRouteIdDirPath, { recursive: true });
  }
  const apiRouteIdFilePath = path.join(apiRouteIdDirPath, 'route.js');
  writeFile(apiRouteIdFilePath, apiRouteIdContent);
  
  // Generate page
  const pageTemplatePath = path.join(templatesDir, 'page.js.ejs');
  const pageContent = renderTemplate(pageTemplatePath, data);
  const pageFilePath = path.join(process.cwd(), 'src', 'app', 'admin', featureNamePlural, 'page.js');
  writeFile(pageFilePath, pageContent);
  
  // If including create form, add create page
  if (data.includeCreate) {
    const createPageTemplatePath = path.join(templatesDir, 'create-page.js.ejs');
    const createPageContent = renderTemplate(createPageTemplatePath, data);
    const createPageDirPath = path.join(process.cwd(), 'src', 'app', 'admin', featureNamePlural, 'create');
    if (!fs.existsSync(createPageDirPath)) {
      fs.mkdirSync(createPageDirPath, { recursive: true });
    }
    const createPageFilePath = path.join(createPageDirPath, 'page.js');
    writeFile(createPageFilePath, createPageContent);
  }
  
  // If including edit form, add edit page
  if (data.includeEdit) {
    const editPageTemplatePath = path.join(templatesDir, 'edit-page.js.ejs');
    const editPageContent = renderTemplate(editPageTemplatePath, data);
    const editPageDirPath = path.join(process.cwd(), 'src', 'app', 'admin', featureNamePlural, '[id]');
    if (!fs.existsSync(editPageDirPath)) {
      fs.mkdirSync(editPageDirPath, { recursive: true });
    }
    const editPageFilePath = path.join(editPageDirPath, 'page.js');
    writeFile(editPageFilePath, editPageContent);
  }
  
  // Create component folder
  const componentDirPath = path.join(process.cwd(), 'src', 'components', 'admin', featureNamePlural);
  if (!fs.existsSync(componentDirPath)) {
    fs.mkdirSync(componentDirPath, { recursive: true });
  }
  
  // If including list view, add list component
  if (data.includeList) {
    const listComponentTemplatePath = path.join(templatesDir, 'component-list.js.ejs');
    const listComponentContent = renderTemplate(listComponentTemplatePath, data);
    const listComponentFilePath = path.join(componentDirPath, `${PascalFeatureName}List.js`);
    writeFile(listComponentFilePath, listComponentContent);
  }
  
  // If including form (create or edit), add form component
  if (data.includeCreate || data.includeEdit) {
    const formComponentTemplatePath = path.join(templatesDir, 'component-form.js.ejs');
    const formComponentContent = renderTemplate(formComponentTemplatePath, data);
    const formComponentFilePath = path.join(componentDirPath, `${PascalFeatureName}Form.js`);
    writeFile(formComponentFilePath, formComponentContent);
  }
  
  // If including detail view, add detail component
  if (data.includeEdit) {
    const detailComponentTemplatePath = path.join(templatesDir, 'component-detail.js.ejs');
    const detailComponentContent = renderTemplate(detailComponentTemplatePath, data);
    const detailComponentFilePath = path.join(componentDirPath, `${PascalFeatureName}Detail.js`);
    writeFile(detailComponentFilePath, detailComponentContent);
  }
  
  // If adding to navigation, modify sidebar component
  if (data.addNavigation) {
    const sidebarPath = path.join(process.cwd(), 'src', 'components', 'layout', 'Sidebar.js');
    
    if (fs.existsSync(sidebarPath)) {
      let sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
      
      // Add icon import to Sidebar.js
      const iconImport = `import ${PascalFeatureName}Icon from '@mui/icons-material/${PascalFeatureName}';\n`;
      const updatedSidebarContent = sidebarContent.replace(
        /import.*?from '@mui\/icons-material';\n/,
        `$&${iconImport}`
      );
      
      // Add new navigation item to Sidebar.js
      const newNavItem = `    {
        text: '${PascalFeatureName}s',
        icon: <${PascalFeatureName}Icon />,
        path: '/admin/${featureNamePlural}',
        children: [
          { text: 'All ${PascalFeatureName}s', path: '/admin/${featureNamePlural}', icon: <${PascalFeatureName}Icon /> },
          { text: 'Create ${PascalFeatureName}', path: '/admin/${featureNamePlural}/create', icon: <${PascalFeatureName}Icon /> },
        ],
      },
      // You can add more sections here as needed`;
      
      // Find the navigationItems array and add the new item
      // Look for the comment that indicates where to add new sections
      const insertPoint = '// You can add more sections here as needed';
      if (updatedSidebarContent.includes(insertPoint)) {
        updatedSidebarContent = updatedSidebarContent.replace(
          insertPoint,
          `${newNavItem}\n    ${insertPoint}`
        );
      } else {
        // Fallback: find the navigationItems array closing bracket
        const navigationItemsPattern = /(const\s+navigationItems\s*=\s*\[[\s\S]*?)(^\s*\]\s*;)/m;
        const match = updatedSidebarContent.match(navigationItemsPattern);
        if (match) {
          updatedSidebarContent = updatedSidebarContent.replace(
            navigationItemsPattern,
            `$1,${newNavItem}\n  $2`
          );
        } else {
          console.warn('Could not find navigationItems array in Sidebar.js');
        }
      }
      
      // Write the updated sidebar content
      fs.writeFileSync(sidebarPath, updatedSidebarContent);
      console.log(`Updated: ${sidebarPath}`);
    } else {
      console.log(`Warning: Sidebar component not found at ${sidebarPath}`);
    }
  }
  
  console.log(`\n✅ Feature "${data.properFeatureName}" generated successfully!`);
}

// Set up CLI
program
  .name('mongonext-generator')
  .description('Code generator for MongoNext Next.js MongoDB starter template')
  .version('1.0.0');

program
  .command('feature')
  .description('Create a complete feature with model, page, API route, and components')
  .action(generateFeature);

program.parse(); 