const MongoClient = require('mongodb').MongoClient;
const BodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerDocument = require('./path/swagger-output.json');

var express = require('express');
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json())
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.use('/', require('./routes'));

app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

const port = 3000;

mongodb.connect((err, mongodb) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log('Connected to database');
    }
});

