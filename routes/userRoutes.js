const express = require('express');
const router = express.Router();
const authenticateToken = require('../middeleware/auth');

router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'Authenticated', user: req.user});
});

module.exports = router;