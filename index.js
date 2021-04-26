//index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//Import custom sources
const {PORT} = require('./config');
const gatewayRoutes = require("./src/gateway/routes");
const peripheralRoutes = require("./src/peripheral/routes");
const errorHandler  = require('./src/helpers/errorHandler');

const app = express();

// Welcome message
app.get('/', (req, res) => res.send('Welcome to Gateway api'));

//Use cors
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Use API routes in the App
app.use('/gateways', gatewayRoutes);
app.use('/peripherals', peripheralRoutes);

//Use error handler
app.use((err, req, res, next) => {
    errorHandler(err, res);
});

// Launch app to the specified port
app.listen(PORT, function () {
    console.log("Running on Port " + PORT);
});
