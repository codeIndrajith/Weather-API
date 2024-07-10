// @desc    Auth user/set token
// routes   POST /api/users/auth
// @access  Public
const authUser = (req, res) => {
  res.status(200).json({ message: 'Auth user' });
};

// @desc    Register a new user
// routes   POST /api/users
// @access  Public
const registerUser = (req, res) => {
  res.status(200).json({ message: 'Register user' });
};

// @desc    Logout user
// routes   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logout user' });
};

// @desc    Update user
// routes   PUT /api/users/update
// @access  Private
const updateUser = (req, res) => {
  res.status(200).json({ message: 'Update user' });
};

export { authUser, registerUser, logoutUser, updateUser };
