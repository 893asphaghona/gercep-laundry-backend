const express = require("express");
const router = express.Router();

// Contoh route GET
router.get('/dashboard', (req, res) => {
  res.send('Welcome to the dashboard!');
});

// Route lain jika ada
router.get('/example', (req, res) => {
  res.json({ message: 'This is an example route' });
});

router.get('/some-route', (req, res) => {
  res.send('This is a valid route.');
});


module.exports = router;

