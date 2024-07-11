import express from 'express';
const router = express.Router();
import {
  authUser,
  getWeatherData,
  getWeatherDataByDate,
  logoutUser,
  registerUser,
  updateUser,
} from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddlware.js';

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/update', protect, updateUser);
router.get('/weather', protect, getWeatherData);
router.get('/weather/:date', protect, getWeatherDataByDate);

export default router;
