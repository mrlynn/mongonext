/**
 * Plop.js configuration for code generation
 * This file enhances the existing Plop configuration with improved templates
 * and more comprehensive feature generation
 */

module.exports = function (plop) {
    // Helper to generate correct path casing
    plop.setHelper('proper', (txt) => {
      return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
    });
  
    // Helper to ensure consistent naming
    plop.setHelper('modelName', (name) => {
      // Convert to singular if plural
      const singular = name.endsWith('s') ? name.slice(0, -1) : name;
      // Convert to camelCase
      return singular.charAt(0).toLowerCase() + singular.slice(1);
    });
  
    // Helper to check if a value is in an array
    plop.setHelper('includes', (arr, val) => {
      return Array.isArray(arr) && arr.includes(val);
    });
  
    // Validate feature name
    const validateFeatureName = (input) => {
      if (!input) return 'Feature name is required';
      if (input.includes(' ')) return 'Feature name cannot contain spaces';
      if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(input)) return 'Feature name must start with a letter and contain only alphanumeric characters';
      return true;
    };
  
    // Feature generator - creates a complete feature with model, page, API route, and components
    plop.setGenerator('feature', {
      description: 'Create a complete feature with model, page, API route, and components',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'Feature name (singular, e.g., "product"):',
          validate: validateFeatureName
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
          default: ''
        }
      ],
      actions: function(data) {
        const actions = [];
        
        // Ensure consistent name format
        const featureName = plop.getHelper('modelName')(data.name);
        const featureNamePlural = featureName.endsWith('s') ? featureName : `${featureName}s`;
        const PascalFeatureName = plop.getHelper('pascalCase')(featureName);
        
        // Set icon default if not provided
        if (!data.icon) {
          data.icon = 'Folder';
        }
        
        data.featureName = featureName;
        data.featureNamePlural = featureNamePlural;
        data.PascalFeatureName = PascalFeatureName;
        
        // Create model
        actions.push({
          type: 'add',
          path: 'src/models/{{featureName}}.model.js',
          templateFile: 'plop-templates/enhanced-model.js.hbs'
        });
        
        // Create API route for collection
        actions.push({
          type: 'add',
          path: 'src/app/api/{{featureNamePlural}}/route.js',
          templateFile: 'plop-templates/enhanced-api-route.js.hbs'
        });
        
        // Create API route for individual items
        actions.push({
          type: 'add',
          path: 'src/app/api/{{featureNamePlural}}/[id]/route.js',
          templateFile: 'plop-templates/enhanced-api-route-id.js.hbs'
        });
        
        // Create page
        actions.push({
          type: 'add',
          path: 'src/app/dashboard/{{featureNamePlural}}/page.js',
          templateFile: 'plop-templates/enhanced-page.js.hbs'
        });
        
        // If including create form, add create page
        if (data.includeCreate) {
          actions.push({
            type: 'add',
            path: 'src/app/dashboard/{{featureNamePlural}}/create/page.js',
            templateFile: 'plop-templates/enhanced-create-page.js.hbs'
          });
        }
        
        // If including edit form, add edit page
        if (data.includeEdit) {
          actions.push({
            type: 'add',
            path: 'src/app/dashboard/{{featureNamePlural}}/[id]/page.js',
            templateFile: 'plop-templates/enhanced-edit-page.js.hbs'
          });
        }
        
        // Create component folder
        actions.push({
          type: 'add',
          path: 'src/components/dashboard/{{featureNamePlural}}/.gitkeep',
          template: ''
        });
        
        // If including list view, add list component
        if (data.includeList) {
          actions.push({
            type: 'add',
            path: 'src/components/dashboard/{{featureNamePlural}}/{{PascalFeatureName}}List.js',
            templateFile: 'plop-templates/enhanced-component-list.js.hbs'
          });
        }
        
        // If including form (create or edit), add form component
        if (data.includeCreate || data.includeEdit) {
          actions.push({
            type: 'add',
            path: 'src/components/dashboard/{{featureNamePlural}}/{{PascalFeatureName}}Form.js',
            templateFile: 'plop-templates/enhanced-component-form.js.hbs'
          });
        }
        
        // If including detail view, add detail component
        if (data.includeEdit) {
          actions.push({
            type: 'add',
            path: 'src/components/dashboard/{{featureNamePlural}}/{{PascalFeatureName}}Detail.js',
            templateFile: 'plop-templates/enhanced-component-detail.js.hbs'
          });
        }
        
        // If adding to navigation, modify sidebar component
        if (data.addNavigation) {
          // Add navigation item to sidebar
          actions.push({
            type: 'add',
            path: 'src/components/layout/Sidebar.js',
            transform: (fileContent) => {
              // Find the navigation items array
              const navItemsIndex = fileContent.indexOf('const navigationItems = [');
              if (navItemsIndex !== -1) {
                // Find the end of the first item
                const firstItemEnd = fileContent.indexOf('},', navItemsIndex);
                if (firstItemEnd !== -1) {
                  // Create the new navigation item
                  const newNavItem = `  // {{PascalFeatureName}} feature (generated by plop)\n  {\n    text: '{{proper featureNamePlural}}',\n    icon: <{{icon}}Icon />,\n    path: '/dashboard/{{featureNamePlural}}',\n    children: [\n      { text: 'All {{proper featureNamePlural}}', path: '/dashboard/{{featureNamePlural}}' },\n      { text: 'Create {{proper featureName}}', path: '/dashboard/{{featureNamePlural}}/create' },\n    ]\n  },`;
                  
                  // Insert the new navigation item after the first item
                  return fileContent.substring(0, firstItemEnd + 2) + '\n' + newNavItem + fileContent.substring(firstItemEnd + 2);
                }
              }
              
              // Fallback: return the original content
              return fileContent;
            }
          });
          
          // Add import for the icon - using a more specific approach
          actions.push({
            type: 'add',
            path: 'src/components/layout/Sidebar.js',
            transform: (fileContent) => {
              // Add the icon import
              const iconImport = `import {{icon}}Icon from '@mui/icons-material/{{icon}}';`;
              
              // Find the position to insert the import
              const importSection = fileContent.indexOf('// Import icons');
              if (importSection !== -1) {
                // Find the next import statement
                const nextImport = fileContent.indexOf('import ', importSection + 1);
                if (nextImport !== -1) {
                  // Insert the new import before the next import
                  return fileContent.substring(0, nextImport) + iconImport + '\n' + fileContent.substring(nextImport);
                }
              }
              
              // Fallback: add to the end of the file
              return fileContent + '\n' + iconImport;
            }
          });
        }
        
        return actions;
      }
    });
  
    // Individual generators for more flexibility
    plop.setGenerator('model', {
      description: 'Create a new Mongoose model',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'Model name (singular, e.g., "product"):',
          validate: validateFeatureName
        },
        {
          type: 'input',
          name: 'description',
          message: 'Model description:',
          default: 'A new model'
        },
        {
          type: 'confirm',
          name: 'includeTimestamps',
          message: 'Include timestamps?',
          default: true
        },
        {
          type: 'checkbox',
          name: 'fields',
          message: 'Select fields to include:',
          choices: [
            { name: 'name (String)', value: 'name' },
            { name: 'description (String)', value: 'description' },
            { name: 'price (Number)', value: 'price' },
            { name: 'isActive (Boolean)', value: 'isActive' },
            { name: 'category (String)', value: 'category' },
            { name: 'tags (Array)', value: 'tags' },
            { name: 'image (String)', value: 'image' },
            { name: 'userId (Reference)', value: 'userId' }
          ]
        }
      ],
      actions: function(data) {
        // Convert name to camelCase and ensure singular
        data.featureName = plop.getHelper('modelName')(data.name);
        
        return [
          {
            type: 'add',
            path: 'src/models/{{featureName}}.model.js',
            templateFile: 'plop-templates/enhanced-model.js.hbs'
          }
        ];
      }
    });
  
    // Page generator
    plop.setGenerator('page', {
      description: 'Create a new page',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'Page name (e.g., "pricing"):',
          validate: (input) => {
            if (!input) return 'Page name is required';
            if (input.includes(' ')) return 'Page name cannot contain spaces';
            return true;
          }
        },
        {
          type: 'input',
          name: 'title',
          message: 'Page title:',
          default: (data) => {
            const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            return `${name} | Your Application`;
          }
        },
        {
          type: 'list',
          name: 'section',
          message: 'Which section?',
          choices: [
            { name: 'Dashboard', value: 'dashboard' },
            { name: 'Admin', value: 'admin' },
            { name: 'Public', value: '' }
          ]
        }
      ],
      actions: function(data) {
        // Determine path based on section
        let pagePath = '';
        
        if (data.section) {
          pagePath = `src/app/${data.section}/{{name}}/page.js`;
        } else {
          pagePath = `src/app/{{name}}/page.js`;
        }
        
        return [
          {
            type: 'add',
            path: pagePath,
            templateFile: 'plop-templates/enhanced-basic-page.js.hbs'
          }
        ];
      }
    });
  
    // API route generator
    plop.setGenerator('api', {
      description: 'Create a new API route',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'API route name (e.g., "products"):',
          validate: (input) => {
            if (!input) return 'API route name is required';
            if (input.includes(' ')) return 'API route name cannot contain spaces';
            return true;
          }
        },
        {
          type: 'checkbox',
          name: 'methods',
          message: 'HTTP methods to include:',
          choices: [
            { name: 'GET', value: 'GET' },
            { name: 'POST', value: 'POST' },
            { name: 'PUT', value: 'PUT' },
            { name: 'PATCH', value: 'PATCH' },
            { name: 'DELETE', value: 'DELETE' }
          ],
          default: ['GET', 'POST']
        },
        {
          type: 'confirm',
          name: 'createModel',
          message: 'Create a corresponding model?',
          default: true
        }
      ],
      actions: function(data) {
        const actions = [];
        
        // Normalize name to plural form for API routes
        const routeName = data.name.endsWith('s') ? data.name : `${data.name}s`;
        // Get singular form for model name
        const modelName = routeName.endsWith('s') ? routeName.slice(0, -1) : routeName;
        
        data.routeName = routeName;
        data.modelName = modelName;
        
        // Create API route
        actions.push({
          type: 'add',
          path: 'src/app/api/{{routeName}}/route.js',
          templateFile: 'plop-templates/enhanced-api-route-methods.js.hbs'
        });
        
        // Create API route with ID parameter
        actions.push({
          type: 'add',
          path: 'src/app/api/{{routeName}}/[id]/route.js',
          templateFile: 'plop-templates/enhanced-api-route-id-methods.js.hbs'
        });
        
        // Create model if requested
        if (data.createModel) {
          actions.push({
            type: 'add',
            path: 'src/models/{{modelName}}.model.js',
            templateFile: 'plop-templates/enhanced-basic-model.js.hbs'
          });
        }
        
        return actions;
      }
    });
  
    // Component generator
    plop.setGenerator('component', {
      description: 'Create a new component',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'Component name (PascalCase):',
          validate: (input) => {
            if (!input) return 'Component name is required';
            if (!/^[A-Z][a-zA-Z0-9]*$/.test(input)) {
              return 'Component name must be in PascalCase (e.g., MyComponent)';
            }
            return true;
          }
        },
        {
          type: 'list',
          name: 'type',
          message: 'Component type:',
          choices: [
            { name: 'UI Component', value: 'ui' },
            { name: 'Layout Component', value: 'layout' },
            { name: 'Form Component', value: 'forms' },
            { name: 'Dashboard Component', value: 'dashboard' },
            { name: 'Feature Component', value: 'feature' }
          ],
          default: 'ui'
        },
        {
          type: 'input',
          name: 'feature',
          message: 'Feature name (for Feature Component):',
          when: (answers) => answers.type === 'feature',
          validate: (input) => {
            if (!input) return 'Feature name is required for Feature Components';
            return true;
          }
        },
        {
          type: 'confirm',
          name: 'createStory',
          message: 'Create a Storybook story?',
          default: true
        },
        {
          type: 'confirm',
          name: 'isClientComponent',
          message: 'Is this a Client Component (uses "use client")?',
          default: true
        }
      ],
      actions: function(data) {
        const actions = [];
        
        // Determine the component path based on type and feature
        let componentPath = '';
        
        if (data.type === 'feature') {
          // If it's a feature component, place it in the feature folder
          componentPath = `src/components/${data.type}/${data.feature}/{{name}}.js`;
        } else {
          // Otherwise, place it in the component type folder
          componentPath = `src/components/${data.type}/{{name}}.js`;
        }
        
        // Add component
        actions.push({
          type: 'add',
          path: componentPath,
          templateFile: data.isClientComponent 
            ? 'plop-templates/enhanced-client-component.js.hbs'
            : 'plop-templates/enhanced-server-component.js.hbs'
        });
        
        // Add Storybook story if requested
        if (data.createStory) {
          actions.push({
            type: 'add',
            path: componentPath.replace('.js', '.stories.js'),
            templateFile: 'plop-templates/enhanced-component-story.js.hbs'
          });
        }
        
        return actions;
      }
    });
  };