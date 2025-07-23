const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description:
        'A simple REST API for managing tasks in a to-do application built with JavaScript',
      contact: {
        name: 'API Support',
        email: 'support@taskmanagement.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === 'production'
            ? 'https://api.taskmanagement.com'
            : `http://localhost:${process.env.PORT || 3000}`,
        description:
          process.env.NODE_ENV === 'production'
            ? 'Production server'
            : 'Development server',
      },
    ],
    tags: [
      {
        name: 'Tasks',
        description: 'Task management operations',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

/**
 * Setup Swagger documentation
 * @param {Object} app - Express app instance
 */
const setupSwagger = (app) => {
  // Swagger page
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Task Management API Documentation',
    })
  );

  // Docs in JSON format
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
};

module.exports = { setupSwagger };
