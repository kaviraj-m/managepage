const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MEOW',
  database: 'db'
});

db.connect();

// Get all projects
app.get('/api/projects', (req, res) => {
  db.query('SELECT * FROM projects', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Update project status (activate/deactivate)
app.post('/api/projects/updateStatus', (req, res) => {
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
