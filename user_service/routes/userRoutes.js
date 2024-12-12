// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

// Routes for CRUD operations
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
