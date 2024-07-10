import express from 'express';
const router = express.Router();
import {
  authUser,
  getWeatherData,
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

export default router;
