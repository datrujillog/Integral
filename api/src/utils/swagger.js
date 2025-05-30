const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de Solicitudes de Servicios de Ingeniería',
        version: '1.0.0',
        description: 'Documentación de la API para la prueba técnica de Integral S.A.',
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Servidor local'
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'], // Comentarios tipo JSDoc en tus rutas
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
