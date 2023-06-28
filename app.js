const path = require('path')
const dotenv = require('dotenv')
const BodyParser = require('body-parser')
const mongodb = require('./config/connect')
const swaggerUi = require('swagger-ui-express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cors = require('cors')
const swaggerDocument = require('./path/swagger-output.json')

// Passport config
require('./config/passport')(passport)

// Connect to db 
mongodb.connect((err, mongodb) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log('Connected to database');
    }
});

// initialize express
var express = require('express');
const { ensureAuth } = require('./middleware/auth')
const app = express();

// Morgan for logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Express Handlebars for templating
app.set('view engine', 'ejs');
app.set('views', './views/layouts');

app.use(
    session({
        secret: 'Cool B34ns',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({mongoUrl:process.env.MONGODB_URI}),
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Swagger
app.use('/api-docs', ensureAuth, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Parser
app.use(express.json())
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
    extended: true
}));

app.use(cors());

// Routes
app.use('/', require('./routes'));
app.use('/auth', require('./routes/auth'))

app.use((err, req, res, next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

const port = process.env.PORT || 3000;




