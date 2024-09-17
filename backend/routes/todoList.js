const express = require('express');
const router = express.Router();
const projectMiddleware = require('../middleware/projectMiddleware');

router.get('/', projectMiddleware('ToDoList'), (req, res) => {
  res.json({ message: 'To-Do List is active' });
});

module.exports = router;
