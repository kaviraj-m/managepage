const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update project status (Install/Hide)
router.post('/updateStatus', async (req, res) => {
  const { ids, action } = req.body;
  const isActive = action === 'install';

  try {
    await Project.update({ isActive }, { where: { id: ids } });
    res.json({ message: 'Projects updated successfully.' });
  } catch (error) {
    console.error('Error updating projects:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
