const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const flash = require('express-flash');
const session = require('express-session');
const cors = require('cors'); 

const db = require('./db');
const config = require('../config');
const errors = require('../network/errors');
const routes = require('../network/routes');
const notFoundHandler = require('../network/notFound');

const DB_URL = `mongodb+srv://${config.db.dbUsername}:${config.db.dbPsw}@${config.db.dbHost}/${config.db.dbName}?retryWrites=true&w=majority`;
db(DB_URL); 

const app = express();

const swaggerDoc = require('./swagger.json');

app.use(bodyParser.json()); 
app.use(flash());   // Mandar mensajes
app.use(session({
    secret: config.auth.session_secret,
    resave: false,
    saveUninitialized: false,
}))
app.use(cors());

// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Routes
routes(app); 


app.use(notFoundHandler);

app.use(errors);    // Este va último

app.listen(config.api.port, () => {
    console.log("API escuchando en el puerto" + config.api.port);
});
 