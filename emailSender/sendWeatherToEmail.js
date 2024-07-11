import cron from 'node-cron';
import { fetchingWeatherData } from '../utils/weatherDetails.js';
import User from '../models/userModel.js';
import sendEmailToUser from '../utils/emailService.js';
import asyncHandler from 'express-async-handler';

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
          sendEmailToUser(user.location, user.email, weatherData);
          console.log(`${user.email} send to weather report`);
        }
      } else {
        console.log('users are not available');
      }
    })
  );
};

export default scheduleEmails;
