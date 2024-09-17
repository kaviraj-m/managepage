const express = require('express');
const router = express.Router();
const projectMiddleware = require('../middleware/projectMiddleware');

router.get('/', projectMiddleware('Calculator'), (req, res) => {
  res.json({ message: 'Calculator is active' });
});

module.exports = router;
