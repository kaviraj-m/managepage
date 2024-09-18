import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Button, Checkbox, FormControlLabel, Paper } from '@mui/material';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          console.error('Expected an array of projects, but received:', response.data);
        }
      });
  }, []);

  const handleCheckboxChange = (id) => {
    if (selectedProjects.includes(id)) {
      setSelectedProjects(selectedProjects.filter((projectId) => projectId !== id));
    } else {
      setSelectedProjects([...selectedProjects, id]);
    }
  };

  const handleAction = (action) => {
    axios.post('http://localhost:5000/api/projects/updateStatus', { ids: selectedProjects, action })
      .then(() => {
        axios.get('http://localhost:5000/api/projects').then((response) => {
          if (Array.isArray(response.data)) {
            setProjects(response.data);
          } else {
            console.error('Expected an array of projects, but received:', response.data);
          }
        });
      });
  };

  return (
    <Box sx={{ bgcolor: '#e0f7e9', minHeight: '100vh', p: 4 }}>
      {/* Page Header */}
      <Typography variant="h4" sx={{ mb: 4, color: '#004d40', fontWeight: 'bold' }}>
        Manage Projects
      </Typography>

      {/* Projects List */}
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Paper
              sx={{
                p: 2,
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: '#ffffff',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s, box-shadow 0.3s',
                },
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedProjects.includes(project.id)}
                    onChange={() => handleCheckboxChange(project.id)}
                    color="primary"
                  />
                }
                label={
                  <Typography sx={{ color: '#004d40', fontWeight: '500' }}>
                    {project.name} - {project.isActive ? 'Active' : 'Hidden'}
                  </Typography>
                }
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Action Buttons */}
      {selectedProjects.length > 0 && (
        <Box mt={4}>
          <Button
            variant="contained"
            sx={{
              mr: 2,
              backgroundColor: '#004d40',
              color: '#fff',
              '&:hover': { backgroundColor: '#00332e' },
            }}
            onClick={() => handleAction('install')}
          >
            Install
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#c62828',
              color: '#fff',
              '&:hover': { backgroundColor: '#b71c1c' },
            }}
            onClick={() => handleAction('uninstall')}
          >
            Uninstall
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ManageProjects;
