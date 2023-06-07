const path = require('path')
const dotenv = require('dotenv')
const BodyParser = require('body-parser')
const mongodb = require('./config/connect')
const swaggerUi = require('swagger-ui-express')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const expressHandlebars = require('express-handlebars')
const cors = require('cors')
const swaggerDocument = require('./path/swagger-output.json')

// Passport config
require('./config/passport')(passport)

// Connect to db 
mongodb.mongooseConnect();

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
const app = express();

// Morgan for logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Express Handlebars for templating
app.engine('.hbs', expressHandlebars.engine({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(
    session({
        secret: '1234qwer!Q',
        resave: false,
        saveUninitialized: false
    })
)


// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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




