import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Paper, List, ListItem, IconButton, Checkbox, Divider } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/todolist')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/todolist', { task, isComplete: false })
      .then(res => {
        setTasks([...tasks, { id: res.data.id, task, isComplete: false }]);
        setTask('');
      })
      .catch(err => console.error(err));
  };

  const handleToggleComplete = (id, isComplete) => {
    axios.put(`http://localhost:3000/api/todolist/${id}`, { isComplete: !isComplete })
      .then(() => {
        setTasks(tasks.map(t => t.id === id ? { ...t, isComplete: !isComplete } : t));
      })
      .catch(err => console.error(err));
  };

  const handleDeleteTask = (id) => {
    axios.delete(`http://localhost:3000/api/todolist/${id}`)
      .then(() => setTasks(tasks.filter(t => t.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <Box sx={{ bgcolor: '#e0f7e9', minHeight: '100vh', p: 4 }}>
      {/* Page Header */}
      <Typography variant="h4" sx={{ mb: 4, color: '#004d40', fontWeight: 'bold', textAlign: 'center' }}>
        Todo List
      </Typography>

      {/* Todo Form */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: '#ffffff', maxWidth: '600px', width: '100%' }}>
          <form onSubmit={handleAddTask}>
            <TextField
              fullWidth
              variant="outlined"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="New task"
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#004d40',
                color: '#fff',
                '&:hover': { backgroundColor: '#00332e' },
                width: '100%',
                padding: '12px',
                fontSize: '1rem'
              }}
            >
              Add Task
            </Button>
          </form>
        </Paper>
      </Box>

      {/* Task List */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ maxWidth: '600px', width: '100%' }}>
          <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 2, bgcolor: '#ffffff' }}>
            {tasks.length > 0 ? (
              <List>
                {tasks.map((t) => (
                  <React.Fragment key={t.id}>
                    <ListItem sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                          checked={t.isComplete}
                          onChange={() => handleToggleComplete(t.id, t.isComplete)}
                        />
                        <Typography sx={{ textDecoration: t.isComplete ? 'line-through' : 'none' }}>
                          {t.task}
                        </Typography>
                      </Box>
                      <IconButton onClick={() => handleDeleteTask(t.id)} sx={{ color: '#d32f2f' }}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', color: '#004d40' }}>
                No tasks available.
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default TodoList;
