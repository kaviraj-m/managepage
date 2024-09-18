const express = require('express');
const { db } = require('../config/db');
const { checkProjectActive } = require('../middleware/checkProjectActive');

const router = express.Router();

router.post('/', checkProjectActive, (req, res) => {
  const { expression, result } = req.body;
  db.query('INSERT INTO calculator (expression, result) VALUES (?, ?)', [expression, result], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});

router.get('/:id', checkProjectActive, (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM calculator WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

router.get('/', checkProjectActive, (req, res) => {
  db.query('SELECT * FROM calculator', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

router.delete('/:id', checkProjectActive, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM calculator WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
});

module.exports = router;
