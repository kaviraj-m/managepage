const express = require('express');
const router = express.Router();
const { Project, Calculator, Note, TodoList } = require('../models');

// middleware to check if the project is active
const checkProjectActive = async (req, res, next) => {
  const projectPath = req.path.split('/')[2];

  try {
    const project = await Project.findOne({ where: { path: projectPath } });
    if (!project || !project.isActive) {
      return res.status(403).json({ error: 'Project is not active' });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// API Routes 

// get all projects
router.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// update project status (activate/deactivate)
router.post('/api/projects/updateStatus', async (req, res) => {
  const { ids, action } = req.body;
  const isActive = action === 'install';

  try {
    const [updated] = await Project.update(
      { isActive },
      { where: { id: ids } }
    );
    if (updated === 0) {
      return res.status(404).json({ error: 'No projects found to update' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API Routes for Calculator
router.post('/api/calculator', checkProjectActive, async (req, res) => {
  try {
    const { expression, result } = req.body;
    const calculator = await Calculator.create({ expression, result });
    res.status(201).json({ id: calculator.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/api/calculator/:id', checkProjectActive, async (req, res) => {
  try {
    const { id } = req.params;
    const calculator = await Calculator.findByPk(id);
    if (!calculator) {
      return res.status(404).json({ error: 'Calculator not found' });
    }
    res.json(calculator);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/api/calculator', checkProjectActive, async (req, res) => {
  try {
    const calculators = await Calculator.findAll();
    res.json(calculators);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/api/calculator/:id', checkProjectActive, async (req, res) => {
  try {
    const { id } = req.params;
    const rowsDeleted = await Calculator.destroy({ where: { id } });
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Calculator not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API Routes for Notes
router.post('/api/notes', checkProjectActive, async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content });
    res.status(201).json({ id: note.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/api/notes/:id', checkProjectActive, async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/api/notes', checkProjectActive, async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/api/notes/:id', checkProjectActive, async (req, res) => {
  try {
    const { id } = req.params;
    const rowsDeleted = await Note.destroy({ where: { id } });
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API Routes for Todo List
router.post('/api/todolist', checkProjectActive, async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const todoList = await TodoList.create({ task, isComplete });
    res.status(201).json({ id: todoList.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/api/todolist/:id', checkProjectActive, async (req, res) => {
  try {
    const { id } = req.params;
    const todoList = await TodoList.findByPk(id);
    if (!todoList) {
      return res.status(404).json({ error: 'Todo List item not found' });
    }
    res.json(todoList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/api/todolist', checkProjectActive, async (req, res) => {
  try {
    const todoLists = await TodoList.findAll();
    res.json(todoLists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/api/todolist/:id', checkProjectActive, async (req, res) => {
  try {
    const { id } = req.params;
    const { task, isComplete } = req.body;
    const [updated] = await TodoList.update({ task, isComplete }, { where: { id } });
    if (updated === 0) {
      return res.status(404).json({ error: 'Todo List item not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/api/todolist/:id', checkProjectActive, async (req, res) => {
  try {
    const { id } = req.params;
    const rowsDeleted = await TodoList.destroy({ where: { id } });
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Todo List item not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
