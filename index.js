//index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//Import custom sources
const {PORT} = require('./config');
const apiRoutes = require("./src/routes");
const errorHandler  = require('./src/helpers/errorHandler');

const app = express();

//Use cors
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Use API routes in the App
app.use('/api', apiRoutes);

//Use error handler
app.use((err, req, res, next) => {
    errorHandler(err, res);
});

// Launch app to the specified port
app.listen(PORT, function () {
    console.log("Running on Port " + PORT);
});
