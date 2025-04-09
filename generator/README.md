# MongoNext Code Generator

This directory contains the code generator for the MongoNext template. The generator helps you quickly create new features, models, components, and API routes.

## Features

- Generate complete features with models, API routes, pages, and components
- Compatible with React and Material UI
- Interactive CLI interface
- Customizable templates

## Installation

The generator is included in the MongoNext starter template. No additional installation is required.

## Usage

To generate a new feature, run:

```bash
npm run generate feature
```

This will prompt you for:
- Feature name (singular form)
- Feature description
- Whether to include list view
- Whether to include create form
- Whether to include edit form
- Whether to include delete functionality
- Whether to add to sidebar navigation
- Material-UI icon for navigation

## Directory Structure

- `index.js` - Main generator script
- `templates/` - EJS templates for generating code
  - `model.js.ejs` - MongoDB model template
  - `api-route.js.ejs` - API route template for collection
  - `api-route-id.js.ejs` - API route template for individual items
  - `page.js.ejs` - List page template
  - `create-page.js.ejs` - Create page template
  - `edit-page.js.ejs` - Edit page template
  - `component-list.js.ejs` - List component template
  - `component-form.js.ejs` - Form component template
  - `component-detail.js.ejs` - Detail component template

## Helper Functions

The generator includes several helper functions for name transformations:

- `pascalCase` - Convert to PascalCase (e.g., "my-feature" → "MyFeature")
- `camelCase` - Convert to camelCase (e.g., "my-feature" → "myFeature")
- `proper` - Proper case (first letter uppercase, rest lowercase)
- `pluralize` - Pluralize a word (e.g., "product" → "products")
- `singularize` - Singularize a word (e.g., "products" → "product")

## Customization

You can customize the templates to fit your specific needs. The templates are located in the `templates/` directory and use EJS syntax.

## Adding New Generators

To add a new generator, create a new command in `index.js` and add the corresponding templates to the `templates/` directory.

## Generated Files

The generator will create the following files:

- Model: `src/models/[featureName].model.js`
- API Routes: 
  - `src/app/api/[featureNamePlural]/route.js`
  - `src/app/api/[featureNamePlural]/[id]/route.js`
- Pages:
  - `src/app/admin/[featureNamePlural]/page.js`
  - `src/app/admin/[featureNamePlural]/create/page.js` (if create form is included)
  - `src/app/admin/[featureNamePlural]/[id]/page.js` (if edit form is included)
- Components:
  - `src/components/admin/[featureNamePlural]/[PascalFeatureName]List.js` (if list view is included)
  - `src/components/admin/[featureNamePlural]/[PascalFeatureName]Form.js` (if create or edit form is included)
  - `src/components/admin/[featureNamePlural]/[PascalFeatureName]Detail.js` (if edit form is included)

## License

MIT 