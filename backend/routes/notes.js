const express = require('express');
const router = express.Router();
const projectMiddleware = require('../middleware/projectMiddleware');

router.get('/', projectMiddleware('Notes'), (req, res) => {
  res.json({ message: 'Notes is active' });
});

module.exports = router;
