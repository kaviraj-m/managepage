const { db } = require('../config/db');

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

module.exports = { checkProjectActive };
