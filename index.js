//index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//Import routes
const apiRoutes = require("./src/routes");
const { PORT } = require('./config');

const app = express();

//Use cors
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Use API routes in the App
app.use('/api', apiRoutes);

// Launch app to the specified port
app.listen(PORT, function () {
    console.log("Running on Port " + PORT);
});
