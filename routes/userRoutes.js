const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Import controller

// Route to fetch all users
router.get('/', userController.getAllUsers);

// Route to add a new user
router.post('/', userController.addUser);

module.exports = router;
