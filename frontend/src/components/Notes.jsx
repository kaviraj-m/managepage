import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Paper, List, ListItem, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const Notes = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/notes')
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/notes', { title, content })
      .then(res => {
        setNotes([...notes, { title, content, id: res.data.id }]);
        setTitle('');
        setContent('');
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/notes/${id}`)
      .then(() => setNotes(notes.filter(note => note.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <Box sx={{ bgcolor: '#e0f7e9', minHeight: '100vh', p: 4 }}>
      {/* Page Header */}
      <Typography variant="h4" sx={{ mb: 4, color: '#004d40', fontWeight: 'bold', textAlign: 'center' }}>
        Notes
      </Typography>

      {/* Notes Form */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: '#ffffff', maxWidth: '600px', width: '100%' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              multiline
              rows={4}
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
              Add Note
            </Button>
          </form>
        </Paper>
      </Box>

      {/* Notes List */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ maxWidth: '600px', width: '100%' }}>
          <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 2, bgcolor: '#ffffff' }}>
            {notes.length > 0 ? (
              notes.map((note) => (
                <Paper key={note.id} sx={{ p: 2, mb: 2, borderRadius: 2, boxShadow: 1, bgcolor: '#f9f9f9' }}>
                  <Typography variant="h6" sx={{ color: '#004d40', fontWeight: 'bold', mb: 1 }}>
                    {note.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {note.content}
                  </Typography>
                  <IconButton
                    onClick={() => handleDelete(note.id)}
                    sx={{ color: '#d32f2f' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              ))
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', color: '#004d40' }}>
                No notes available.
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Notes;
