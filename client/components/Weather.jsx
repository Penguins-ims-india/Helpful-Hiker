import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Typography, Box } from '@mui/material';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const weatherRef = useRef(weatherData);

  // Get api/weather
  const getWeatherData = () => {
    axios.get('/weather')
    .then((response) => {
      // set state using setWeatherData
      setWeatherData(response.data);
    })
    .catch((err) => {
      console.error('Error getting weather data', err);
    })
  };


  useEffect(() => {
    getWeatherData();
  }, [weatherRef]);

  // conversion to Fahrenheit
  const toFahrenheit = (celsius) => {
    return Math.floor(((celsius * 9/5) + 32) * 100) / 100;
  };

  return (
    <Box >
      {weatherData ? (
        <div>
          <Typography
            sx={{
              fontFamily: '',
            }}
          >
            Current Temperature: {toFahrenheit(weatherData.days[0].temp)}°F
          </Typography>
          <Typography
            sx={{
              fontFamily: '',
            }}
          >
            Weather Conditions: {weatherData.days[0].description}
          </Typography>
        </div>
      ) : (
        <Typography
        sx={{
          fontFamily: '',
        }}
      >
        Loading...
      </Typography>
      )}
    </Box>
  );
};

export default Weather;
