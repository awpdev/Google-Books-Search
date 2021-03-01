const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

// API Routes
router.use('/api', apiRoutes);

// React app if no routes are hit
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

module.exports = router;
