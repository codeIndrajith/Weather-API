import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import asyncHandler from 'express-async-handler';

const fetchingWeatherData = asyncHandler(async (location) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_MAP_API_KEY}`
  );
  return response.data;
});

export { fetchingWeatherData };
