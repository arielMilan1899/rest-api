//index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

async function useProxy(request, method) {
  const data = JSON.stringify({
    "collection": "InvestmentVehicles",
    "database": "Dictionary",
    "dataSource": "Cluster0"
  });

  const config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-vazmi/endpoint/data/v1/action/find',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'SMkerQXsfb8nr1wRDpIXuhGIYCJjliCyuMAyS9xP2LNZrS0GGe6e7nYXAfYJdwnv',
    },
    data: data
  };

  try {
    const {data} = await axios(config)
    return data;
  } catch (err) {
    console.log(err);
  }
}

const app = express();

app.get('/', async (req, res) => {
  const data = await useProxy(req, 'POST')
  res.status(200).send(JSON.stringify(data))
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
