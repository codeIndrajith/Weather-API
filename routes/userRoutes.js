const express = require('express');
const router = express.Router();
const {
  authUser,
  getWeatherData,
  getWeatherDataByDate,
  logoutUser,
  registerUser,
  updateUser,
} = require('../controllers/userControllers.js');
const { protect } = require('../middleware/authMiddlware.js');

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/update', protect, updateUser);
router.get('/weather', protect, getWeatherData);
router.get('/weather/:date', protect, getWeatherDataByDate);

module.exports = router;
