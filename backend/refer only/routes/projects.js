const express = require('express');
const { db } = require('../config/db');

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM projects', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

router.post('/updateStatus', (req, res) => {
  const { ids, action } = req.body;
  const isActive = action === 'install' ? 1 : 0;

  db.query(
    'UPDATE projects SET isActive = ? WHERE id IN (?)',
    [isActive, ids],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true });
    }
  );
});

module.exports = router;
