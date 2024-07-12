const cron = require('node-cron');
const { fetchingWeatherData } = require('../utils/weatherDetails.js');
const User = require('../models/userModel.js');
const sendEmailToUser = require('../utils/emailService.js');
const asyncHandler = require('express-async-handler');
const geminiAiFunction = require('../utils/aiService.js');

// schedule a cron job send to emails in every 3 hours for all users
// 0 */3 * * * describe 3 hours
const scheduleEmails = () => {
  cron.schedule(
    '0 */3 * * *',
    asyncHandler(async () => {
      const users = await User.find({});

      if (users) {
        for (const user of users) {
          const weatherData = await fetchingWeatherData(user.location);
          const weatherTextAI = await geminiAiFunction(weatherData.main.temp);
          sendEmailToUser(
            user.location,
            user.email,
            weatherData,
            weatherTextAI
          );
          console.log(`${user.email} send to weather report`);
        }
      } else {
        console.log('users are not available');
      }
    })
  );
};

module.exports = scheduleEmails;
