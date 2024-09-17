const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MEOW',
  database: 'db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database.');
});

// Sample endpoint
app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM sample_table', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
