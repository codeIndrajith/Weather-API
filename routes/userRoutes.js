import express from 'express';
const router = express.Router();
import {
  authUser,
  logoutUser,
  registerUser,
  updateUser,
} from '../controllers/userControllers.js';

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/update', updateUser);

export default router;
