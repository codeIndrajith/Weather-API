import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import asyncHandler from 'express-async-handler';

// Fetching the weather data by location

const fetchingWeatherData = asyncHandler(async (location) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_MAP_API_KEY}`
  );
  return response.data;
});

// Fetching the weather data by given day. But the forecast weather api is included data within 5 days 3 hours
const fetchingWeatherDataByDate = asyncHandler(async (location, date) => {
  const currentDate = new Date();
  const userDate = new Date(parseInt(date, 10) * 1000);
  const timeDifference = Math.abs(userDate - currentDate); // get the output in milliseconds
  const hourDifferent = Math.ceil(timeDifference / (1000 * 60 * 60)); // Convert the time difference to hours

  //   checking the details
  console.log(userDate);
  console.log(timeDifference);
  console.log(hourDifferent);
  console.log('*********************');

  if (hourDifferent <= 120) {
    // Because the api have to 5 days 3 hours forecast data...
    // Have to lat, lon to API, so first fetching this
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_MAP_API_KEY}`
    );
    const { lon, lat } = weatherResponse.data.coord;

    // pass the forecast api  this lon and lat to fetching forecast data within 5 days 3 hours
    const forecastResponse = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_MAP_API_KEY}`
    );
    const forecasts = forecastResponse.data.list;
    // console.log(forecasts);

    // Find the weather data closest to the target date
    const weatherDataToUserDate = forecasts.find((forecast) => {
      const forecastDate = new Date(forecast.dt * 1000);
      return forecastDate >= userDate;
    });

    // checking the details
    console.log(weatherDataToUserDate);

    if (weatherDataToUserDate) {
      return weatherDataToUserDate;
    } else {
      return 'Weather data not found this date.';
    }
  } else {
    return 'The weather data is included up to 5 days and 3 hours from the mentioned date.';
  }
});

export { fetchingWeatherData, fetchingWeatherDataByDate };
