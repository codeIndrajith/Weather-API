import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use('/api/users', userRoutes);

app.use('/', (req, res) => {
  res.send('Server is ready');
});

app.listen(PORT, () => {
  console.log(`Server is running to PORT ${PORT}`);
});
