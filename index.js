//index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

async function useProxy(request) {
  const req = new Request('https://data.mongodb-api.com/app/data-vazmi/endpoint/data/v1/action/find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'SMkerQXsfb8nr1wRDpIXuhGIYCJjliCyuMAyS9xP2LNZrS0GGe6e7nYXAfYJdwnv',
    },
    body: {
      "collection": "InvestmentVehicles",
      "database": "Dictionary",
      "dataSource": "Cluster0"
    },
  })
  // Send the request on to the gcloud function.
  const response = await fetch(req)

  return response
}

const app = express();

app.get('/', async (req, res) => {
  return await useProxy(req, 'POST')
});

//Use cors
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Launch app to the specified port
module.exports = app.listen(3000, function () {
  console.log("Running on Port " + 3000);
});
