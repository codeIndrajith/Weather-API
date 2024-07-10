import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
const PORT = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/database.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

// database connection
connectDB();

app.use('/api/users', userRoutes);

app.use('/', (req, res) => {
  res.send('Server is ready');
});

app.listen(PORT, () => {
  console.log(`Server is running to PORT ${PORT}`);
});
