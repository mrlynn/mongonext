module.exports = function (plop) {
  // Component generator
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase):',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Component type:',
        choices: ['ui', 'layout', 'form', 'page'],
        default: 'ui',
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{type}}/{{name}}.js',
        templateFile: 'plop-templates/component.js.hbs',
      }
    ],
  });

  // Page generator
  plop.setGenerator('page', {
    description: 'Create a new page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Page path (e.g., users/profile):',
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/{{name}}/page.js',
        templateFile: 'plop-templates/page.js.hbs',
      }
    ],
  });
  
  // API route generator
  plop.setGenerator('api', {
    description: 'Create a new API route',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'API route name (e.g., users):',
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/api/{{name}}/route.js',
        templateFile: 'plop-templates/api-route.js.hbs',
      }
    ],
  });

  // Model generator
  plop.setGenerator('model', {
    description: 'Create a new Mongoose model',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Model name (PascalCase, singular):',
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/models/{{camelCase name}}.model.js',
        templateFile: 'plop-templates/model.js.hbs',
      }
    ],
  });
};
