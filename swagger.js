const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Memory Lanes API',
        description: 'This is the API that handles the data for the Memory Lanes App',
    },
    host: 'memory-lanes-api.onrender.com',
    schemes: ['http, https'],
};

const outputFile = './path/swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);