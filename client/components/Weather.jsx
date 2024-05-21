import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Typography, Box } from '@mui/material';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const weatherRef = useRef(weatherData);

  // Get api/weather
  const getWeatherData = () => {
    axios.get('api/weather')
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
    return (celsius * 9/5) + 32;
  };

  return (
    <Box sx={styleOrangeBox}>
      {weatherData ? (
        <div>
          <Typography
            variant=''
            sx={{
              fontFamily: '',
            }}
          >
            Current Temperature: {toFahrenheit(weatherData.days[0].temp)}°F
          </Typography>
          <Typography
            variant=''
            sx={{
              fontFamily: '',
            }}
          >
            Weather Conditions: {weatherData.days[0].description}
          </Typography>
        </div>
      ) : (
        <Typography
        variant=''
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
