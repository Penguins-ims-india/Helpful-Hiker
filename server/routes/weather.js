const express = require('express');
const axios = require('axios');
const weather = express.Router();
const { VISUAL_CROSSING_API_KEY } = process.env;

weather.get('/weather/:location', (req, res) => {
  const { location } = req.params;
  const apiKey = VISUAL_CROSSING_API_KEY;
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&contentType=json&key=${apiKey}`;

  axios.get(apiUrl)
    .then((weatherResponse) => {
      res.json(weatherResponse.data);
    })
    .catch((err) => {
      console.error("Could not get weather data", err);
      res.sendStatus(500);
    });
});

module.exports = weather;
