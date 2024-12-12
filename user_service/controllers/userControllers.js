// controllers/userController.js
const userModel = require('../models/user_model');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone, role } = req.body;
    const newUser = await userModel.createUser(first_name, last_name, email, password, phone, role);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone, role } = req.body;
    const updatedUser = await userModel.updateUser(first_name, last_name, email, password, phone, role);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    await userModel.deleteUser(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
