import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

// @desc   Auth user & get token
// @route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  // We are getting the email and password from the request body.
  res.send('Auth User');
});

// @desc   Register user
// @route  POST/api/users/login
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  res.send('Register User');
});

// @desc   Logout user / Clear cookie
// @route  POST/api/users/login
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send('Logout User');
});

// @desc   Get user profile
// @route  POST/api/users/profile ( We are not passing the id in the url because we are getting the id from the JSON WEB token.)
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('Get User Profile');
});

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('Update User Profile');
});

// @desc   Get all users
// @route  GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send('Get Users');
});

// @desc   Get all user by ID
// @route  GET /api/users/:id
// @access Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  res.send('Get User by ID');
});

// @desc   DELETE user
// @route  DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send('Delete User');
});

// @desc   Update user
// @route  PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('Update User');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  deleteUser,
  updateUser,
};
