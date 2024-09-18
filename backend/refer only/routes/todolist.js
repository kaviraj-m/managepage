const express = require('express');
const { db } = require('../config/db');
const { checkProjectActive } = require('../middleware/checkProjectActive');

const router = express.Router();

router.post('/', checkProjectActive, (req, res) => {
  const { task, isComplete } = req.body;
  db.query('INSERT INTO todolist (task, isComplete) VALUES (?, ?)', [task, isComplete], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});

router.get('/:id', checkProjectActive, (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM todolist WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

router.get('/', checkProjectActive, (req, res) => {
  db.query('SELECT * FROM todolist', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

router.put('/:id', checkProjectActive, (req, res) => {
  const { id } = req.params;
  const { task, isComplete } = req.body;
  db.query('UPDATE todolist SET task = ?, isComplete = ? WHERE id = ?', [task, isComplete, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
});

router.delete('/:id', checkProjectActive, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM todolist WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
});

module.exports = router;
