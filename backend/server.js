const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Enable CORS
app.use(cors());

// Use body-parser to parse JSON requests
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'meow',
  database: 'db'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

// Middleware to check if the project is active
const checkProjectActive = (req, res, next) => {
  const projectPath = req.path.split('/')[2];

  db.query('SELECT isActive FROM projects WHERE path = ?', [projectPath], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0 || results[0].isActive === 0) {
      return res.status(403).json({ error: 'Project is not active' });
    }

    next();
  });
};

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

// API Routes for Calculator
app.post('/api/calculator', checkProjectActive, (req, res) => {
  const { expression, result } = req.body;
  db.query('INSERT INTO calculator (expression, result) VALUES (?, ?)', [expression, result], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});

app.get('/api/calculator/:id', checkProjectActive, (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM calculator WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

app.get('/api/calculator', checkProjectActive, (req, res) => {
  db.query('SELECT * FROM calculator', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.delete('/api/calculator/:id', checkProjectActive, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM calculator WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
});

// API Routes for Notes
app.post('/api/notes', checkProjectActive, (req, res) => {
  const { title, content } = req.body;
  db.query('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});

app.get('/api/notes/:id', checkProjectActive, (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM notes WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

app.get('/api/notes', checkProjectActive, (req, res) => {
  db.query('SELECT * FROM notes', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.delete('/api/notes/:id', checkProjectActive, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM notes WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
});

// API Routes for Todo List
app.post('/api/todolist', checkProjectActive, (req, res) => {
  const { task, isComplete } = req.body;
  db.query('INSERT INTO todolist (task, isComplete) VALUES (?, ?)', [task, isComplete], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});

app.get('/api/todolist/:id', checkProjectActive, (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM todolist WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

app.get('/api/todolist', checkProjectActive, (req, res) => {
  db.query('SELECT * FROM todolist', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.put('/api/todolist/:id', checkProjectActive, (req, res) => {
  const { id } = req.params;
  const { task, isComplete } = req.body;
  db.query('UPDATE todolist SET task = ?, isComplete = ? WHERE id = ?', [task, isComplete, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
});

app.delete('/api/todolist/:id', checkProjectActive, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM todolist WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
