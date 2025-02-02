// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController');

// Rute login
router.post('/login', loginUser);

// Rute register
router.post('/register', registerUser);

module.exports = router;
