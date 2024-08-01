const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/userRoutes.js');
const connectDB = require('./config/database.js');
const { errorHandler, notFound } = require('./middleware/errorMiddleware.js');
const scheduleEmails = require('./emailSender/sendWeatherToEmail.js');
const geminiAiFunction = require('./utils/aiService.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// send email to user
// scheduleEmails();

// geminiAiFunction();

// cookie parser
app.use(cookieParser());

// database connection
connectDB();

app.use('/api/users', userRoutes);

app.use('/', (req, res) => {
  res.send('Server is ready');
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running to PORT ${PORT}`);
});
