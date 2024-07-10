import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import { fetchingWeatherData } from '../utils/weatherDetails.js';

// @desc    Auth user/set token
// routes   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// routes   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, location } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exist');
  }

  // create a new user
  const user = await User.create({
    name,
    email,
    password,
    location,
  });

  if (user) {
    generateToken(res, user._id); // generate the token and its store the cookie
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user
// routes   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  // Destroy the cookie
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out' });
});

// @desc    Update user
// routes   PUT /api/users/update
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.location = req.body.location || user.location;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Weather fetching
// routes   GET /api/users/weather
// @access  Private
const getWeatherData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const weatherData = await fetchingWeatherData(user.location);
    res.status(200).json(weatherData);
  } else {
    res.status(404);
    throw new Error('User cannot find. Then weather data have not');
  }
});

export { authUser, registerUser, logoutUser, updateUser, getWeatherData };
