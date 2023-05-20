const MongoClient = require('mongodb').MongoClient;
const BodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./path/swagger-output.json');

var express = require('express');
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(BodyParser.json());

app.use('/', require('./routes'));

const port = 3000;

mongodb.connect((err, mongodb) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log('Connected to database');
    }
});

