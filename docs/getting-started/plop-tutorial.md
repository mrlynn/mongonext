# Using Plop to Extend the MongoNext Template

This guide will walk you through using Plop to quickly scaffold new features in your MongoNext application. Plop is a powerful code generator that helps you maintain consistency and speed up development.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Setting Up Plop](#setting-up-plop)
- [Available Generators](#available-generators)
- [Creating a Complete Feature](#creating-a-complete-feature)
- [Understanding Generated Files](#understanding-generated-files)
- [Individual Generators](#individual-generators)
- [Customizing Templates](#customizing-templates)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Introduction

Plop is a "micro-generator framework" that helps you create new files with consistent patterns. In MongoNext, we've set up Plop to generate:

- Mongoose models with JSDoc comments and proper validation
- Next.js pages with full client-side functionality
- API routes with comprehensive error handling and authentication
- React components for UI, forms, lists, and detail views
- Storybook stories for component documentation

This allows you to quickly scaffold new features while maintaining consistent code structure and patterns.

## Installation

Plop is already included in the MongoNext template. If you need to install it manually:

```bash
npm install --save-dev plop
```

## Setting Up Plop

The MongoNext template includes a pre-configured Plop setup. The configuration is in the `plopfile.js` file in the root of your project.

To run Plop, use the following command:

```bash
npm run plop
```

This will show you a list of available generators.

## Available Generators

MongoNext includes several enhanced Plop generators:

### 1. Feature Generator

Creates a complete feature with model, page, API route, and components:

```bash
npm run plop feature
```

This generator will create:
- A Mongoose model with JSDoc comments and validation
- API routes for collection and individual items with proper error handling
- Dashboard pages for listing, creating, and editing
- List, form, and detail components with full functionality
- Optional sidebar navigation integration

### 2. Model Generator

Creates a new Mongoose model with selectable fields:

```bash
npm run plop model
```

This will prompt you for:
- Model name and description
- Whether to include timestamps
- Which fields to include (name, description, price, isActive, etc.)

### 3. Page Generator

Creates a new Next.js page with layout and metadata:

```bash
npm run plop page
```

You can choose from:
- Dashboard pages
- Admin pages
- Public pages
- Custom page titles and layouts

### 4. API Generator

Creates a new API route with selectable HTTP methods:

```bash
npm run plop api
```

This will prompt you for:
- API route name
- Which HTTP methods to include (GET, POST, PUT, PATCH, DELETE)
- Whether to create a corresponding model

### 5. Component Generator

Creates a new React component with optional Storybook story:

```bash
npm run plop component
```

Options include:
- Component type (UI, Layout, Form, Dashboard, Feature)
- Client or Server component
- Storybook story generation
- Feature-specific components

## Creating a Complete Feature

Let's walk through creating a complete feature using Plop. We'll create a "Product" feature as an example.

### Step 1: Run the Feature Generator

```bash
npm run plop feature
```

### Step 2: Answer the Prompts

When prompted, enter the following information:

```
? Feature name (singular, e.g., "product"): product
? Feature description: A product in our catalog
? Include list view? Yes
? Include create form? Yes
? Include edit form? Yes
? Include delete functionality? Yes
? Add to sidebar navigation? Yes
? MUI Icon for navigation: ShoppingCart
```

### Step 3: Review the Generated Files

Plop will generate the following files:

- `src/models/product.model.js` - Mongoose model with proper validation
- `src/app/api/products/route.js` - API routes for collection operations
- `src/app/api/products/[id]/route.js` - API routes for individual items
- `src/app/dashboard/products/page.js` - List page with search and pagination
- `src/app/dashboard/products/create/page.js` - Create page with form
- `src/app/dashboard/products/[id]/page.js` - Detail/edit page with form
- `src/components/dashboard/products/ProductList.js` - List component with actions
- `src/components/dashboard/products/ProductForm.js` - Form component with validation
- `src/components/dashboard/products/ProductDetail.js` - Detail component

It will also update the sidebar navigation in `src/components/layout/Sidebar.js` to include your new feature.

## Understanding Generated Files

### Model (product.model.js)

The generated model includes:
- JSDoc documentation for IntelliSense support
- Proper schema validation with error messages
- Timestamps for tracking creation and updates
- Indexes for better query performance

```javascript
/**
 * @file Product model definition with mongoose schema
 * @module models/product
 * @description A product in our catalog
 */

import mongoose from 'mongoose';
const { Schema } = mongoose;

/**
 * Product schema definition for MongoDB
 * @typedef {Object} ProductSchema
 */
const productSchema = new Schema({
  /**
   * Name of the product
   * @type {String}
   * @required
   */
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  
  /**
   * Description of the product
   * @type {String}
   */
  description: { 
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  
  // Other fields...
  
}, {
  timestamps: true
});

// Indexes for better performance
productSchema.index({ name: 1 });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
```

### API Routes (route.js and [id]/route.js)

API routes include:
- Collection operations (GET, POST, etc.)
- Individual item operations
- Comprehensive error handling
- Authentication checks
- Query parameter handling for search and pagination

```javascript
/**
 * @file API routes for products collection
 * @module app/api/products
 */

export async function GET(request) {
  try {
    // Connect to database
    await connectDB();
    
    // Get query parameters for search and pagination
    const { searchParams } = new URL(request.url);
    // ...

    // Return success response with pagination
    return NextResponse.json({
      success: true,
      data: {
        products,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    // Error handling
  }
}

// Other HTTP methods...
```

### Page Components

The generated pages include:
- List view with search and pagination
- Create form with validation
- Edit/detail view with confirmation dialogs
- Error handling and loading states

### UI Components

Components are organized into:
- List components for displaying data tables
- Form components for creating and editing
- Detail components for viewing full information

## Individual Generators

### Using the Model Generator

The model generator allows you to create customized Mongoose models:

```bash
npm run plop model
```

When prompted, you can select which fields to include in your model. Fields include:
- Basic fields (name, description)
- Data types (string, number, boolean, array)
- References to other models (userId)

### Using the Component Generator

The component generator offers options for different component types:

```bash
npm run plop component
```

You can choose:
1. UI Component - Basic reusable UI elements
2. Layout Component - Page layouts and structures
3. Form Component - Input forms and controls
4. Dashboard Component - Admin dashboard elements
5. Feature Component - Components tied to a specific feature

You can also specify whether it's a Client Component (with 'use client' directive) or a Server Component, and whether to generate a Storybook story.

## Customizing Templates

You can customize the Plop templates to better fit your project's needs.

### Enhanced Template Location

The enhanced templates are located in the `plop-templates` directory:

```
plop-templates/
├── enhanced-model.js.hbs
├── enhanced-api-route.js.hbs
├── enhanced-api-route-id.js.hbs
├── enhanced-api-route-methods.js.hbs
├── enhanced-page.js.hbs
├── enhanced-create-page.js.hbs
├── enhanced-edit-page.js.hbs
├── enhanced-component-list.js.hbs
├── enhanced-component-form.js.hbs
├── enhanced-component-detail.js.hbs
├── enhanced-client-component.js.hbs
├── enhanced-server-component.js.hbs
├── enhanced-component-story.js.hbs
└── enhanced-basic-model.js.hbs
```

### Modifying Templates

To modify a template, edit the corresponding `.hbs` file. Handlebars syntax is used for templating:

- `{{camelCase name}}` - Converts to camelCase (e.g., "my-feature" → "myFeature")
- `{{pascalCase name}}` - Converts to PascalCase (e.g., "my-feature" → "MyFeature")
- `{{proper name}}` - Capitalizes first letter (e.g., "product" → "Product")
- `{{includes fields 'value'}}` - Checks if a value exists in an array
- `{{if condition}}...{{/if}}` - Conditional rendering

### Advanced Templating Features

The enhanced templates support advanced features:

1. **Conditional Rendering**:
   ```handlebars
   {{#if includeDelete}}
   <DeleteButton onClick={handleDelete} />
   {{/if}}
   ```

2. **Looping and Arrays**:
   ```handlebars
   {{#each fields}}
   // Field: {{this}}
   {{/each}}
   ```

3. **Conditional HTTP Methods**:
   ```handlebars
   {{#if (includes methods 'GET')}}
   export async function GET(request) {
     // Method implementation
   }
   {{/if}}
   ```

### Example: Adding a Custom Field to the Model Template

To add a custom field to the model template, edit `plop-templates/enhanced-model.js.hbs`:

```javascript
/**
 * {{proper featureName}} schema definition for MongoDB
 * @typedef {Object} {{pascalCase featureName}}Schema
 */
const {{featureName}}Schema = new Schema({
  // Existing fields...
  
  /**
   * Custom field for your specific needs
   * @type {String}
   */
  customField: {
    type: String,
    required: [true, 'Custom field is required'],
    enum: ['Option1', 'Option2', 'Option3'],
    default: 'Option1'
  },
  
}, {
  timestamps: {{includeTimestamps}}
});
```

## Best Practices

### 1. Keep a Consistent Structure

Use the generated code structure as a guide for your project organization.

### 2. Use Descriptive Names

Choose clear, descriptive names for your features, models, and components.

### 3. Document Your Code

The generated code includes JSDoc comments. Maintain this pattern for your custom code.

### 4. Test Generated Code

The generated code provides a starting point. Always test and adapt it to your specific needs.

### 5. Update Templates for Project Needs

As your project evolves, update the templates to match your team's standards and preferences.

### 6. Use Type Safety

While the template uses JSDoc comments for type hinting, consider adding TypeScript for enhanced type safety.

## Troubleshooting

### Common Issues

#### 1. Template Not Found

If you see an error like `Template not found: plop-templates/enhanced-model.js.hbs`, check that:
- The template file exists in the `plop-templates` directory
- The file name matches exactly what's specified in the `plopfile.js`

#### 2. Syntax Errors in Generated Code

If the generated code has syntax errors, check the template file for issues. Common problems include:
- Missing closing tags in conditional blocks (`{{#if}}` without `{{/if}}`)
- Incorrect Handlebars syntax
- JavaScript syntax errors in the template

#### 3. Path Issues

If files are generated in the wrong location, check the `path` property in the `plopfile.js` file.

#### 4. Helper Functions Not Working

If helper functions like `proper` or `includes` are not working, make sure they are properly defined in your `plopfile.js`.

### Getting Help

If you encounter issues with Plop, you can:
- Check the [Plop documentation](https://plopjs.com/)
- Look for similar issues on [GitHub](https://github.com/plopjs/plop/issues)
- Ask for help in the MongoNext community

## Conclusion

Plop is a powerful tool for generating code in your MongoNext project. The enhanced templates provide a comprehensive starting point for your features, with proper structure, validation, error handling, and documentation.

By leveraging these generators, you can focus on your application's unique requirements rather than repetitive boilerplate code.

Remember to customize the templates to fit your specific project needs and follow best practices for code generation.

Happy coding!