import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Typography, Box } from '@mui/material';

const Weather = ({location}) => {
  const [weatherData, setWeatherData] = useState(null);
  const weatherRef = useRef(weatherData);
  // Get api/weather
  const getWeatherData = () => {
    axios.get(`/api/weather/${location}`)
    .then((response) => {
      // set state using setWeatherData
      setWeatherData(response.data.days[0].description);
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
  // Current Temperature: {toFahrenheit(weatherData.days[0].temp)}°F
  return (
    <div >
      {weatherData ? (
        <>
         Weather Conditions: {weatherData}
        </> 
      ) : (
       <>
        Loading...
      </>
      )}
    </div>
  );
};

export default Weather;
