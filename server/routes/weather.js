const express = require('express');
const axios = require('axios');
const weather = express.Router();
const { GOOGLE_MAPS_API_KEY, VISUAL_CROSSING_API_KEY } = process.env;

weather.get('/weather', (req, res) => {
  const userIpAddress = req.clientIp;
  axios.get(`http://ip-api.com/json/${userIpAddress}?fields=city,region,countryCode`)
    .then((ipResponse) => {

      const userCity = ipResponse.data.city;
      const userState = ipResponse.data.region;
      const userCountryCode = ipResponse.data.countryCode;

      const apiKey = VISUAL_CROSSING_API_KEY;
      const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userCity},${userState},${userCountryCode}/today?unitGroup=metric&contentType=json&key=${apiKey}`;

      return axios.get(apiUrl);
    })
    .then((weatherResponse) => {
      res.json(weatherResponse.data);
    })
    .catch((err) => {
      console.error("Could not get weather data", err);
      res.sendStatus(500);
    });
});

module.exports = weather;
